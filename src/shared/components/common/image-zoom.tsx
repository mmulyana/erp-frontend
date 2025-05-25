'use client'

import { useState, useRef, useCallback } from 'react'
import { Button } from '@/shared/components/ui/button'
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react'

interface Position {
	x: number
	y: number
}

interface Bounds {
	minX: number
	maxX: number
	minY: number
	maxY: number
}

type Props = {
	url?: string
}

export default function ImageZoom({ url }: Props) {
	const [scale, setScale] = useState(0.4)
	const [position, setPosition] = useState<Position>({ x: 0, y: 0 })
	const [isDragging, setIsDragging] = useState(false)
	const [dragStart, setDragStart] = useState<Position>({ x: 0, y: 0 })
	const [isAnimating, setIsAnimating] = useState(false)
	const [imageSize, setImageSize] = useState<{ width: number; height: number }>(
		{ width: 0, height: 0 }
	)

	const containerRef = useRef<HTMLDivElement>(null)
	const imgRef = useRef<HTMLImageElement>(null)

	const minScale = 0.1
	const maxScale = 10
	const scaleStep = 0.3

	const calculateBounds = useCallback(
		(currentScale: number): Bounds => {
			if (!containerRef.current || currentScale <= 0.5) {
				return { minX: 0, maxX: 0, minY: 0, maxY: 0 }
			}

			const containerRect = containerRef.current.getBoundingClientRect()
			const imageWidth = imageSize.width * currentScale
			const imageHeight = imageSize.height * currentScale

			const maxX = Math.max(0, (imageWidth - containerRect.width) / 2)
			const maxY = Math.max(0, (imageHeight - containerRect.height) / 2)

			return { minX: -maxX, maxX, minY: -maxY, maxY }
		},
		[imageSize]
	)

	const constrainPosition = useCallback(
		(pos: Position, currentScale: number): Position => {
			const bounds = calculateBounds(currentScale)
			return {
				x: Math.max(bounds.minX, Math.min(bounds.maxX, pos.x)),
				y: Math.max(bounds.minY, Math.min(bounds.maxY, pos.y)),
			}
		},
		[calculateBounds]
	)

	const animateZoom = useCallback(
		(targetScale: number, centerPoint?: Position) => {
			if (isAnimating) return
			setIsAnimating(true)
			const startScale = scale
			const startPosition = position

			let targetPosition = position
			if (centerPoint && containerRef.current) {
				const rect = containerRef.current.getBoundingClientRect()
				const centerX = rect.width / 2
				const centerY = rect.height / 2
				const offsetX = centerPoint.x - centerX
				const offsetY = centerPoint.y - centerY
				const scaleDiff = targetScale / startScale
				targetPosition = {
					x: startPosition.x - offsetX * (scaleDiff - 1),
					y: startPosition.y - offsetY * (scaleDiff - 1),
				}
			}

			targetPosition = constrainPosition(targetPosition, targetScale)

			const duration = 300
			const startTime = Date.now()

			const animate = () => {
				const elapsed = Date.now() - startTime
				const progress = Math.min(elapsed / duration, 1)
				const easeOut = 1 - Math.pow(1 - progress, 3)
				setScale(startScale + (targetScale - startScale) * easeOut)
				setPosition({
					x: startPosition.x + (targetPosition.x - startPosition.x) * easeOut,
					y: startPosition.y + (targetPosition.y - startPosition.y) * easeOut,
				})
				if (progress < 1) requestAnimationFrame(animate)
				else setIsAnimating(false)
			}

			requestAnimationFrame(animate)
		},
		[scale, position, isAnimating, constrainPosition]
	)

	const handleZoomIn = useCallback(
		(centerPoint?: Position) => {
			animateZoom(Math.min(scale * (1 + scaleStep), maxScale), centerPoint)
		},
		[scale, animateZoom]
	)

	const handleZoomOut = useCallback(
		(centerPoint?: Position) => {
			animateZoom(Math.max(scale * (1 - scaleStep), minScale), centerPoint)
		},
		[scale, animateZoom]
	)

	const handleReset = useCallback(
		() => animateZoom(0.4, { x: 0, y: 0 }),
		[animateZoom]
	)

	const handleWheel = useCallback(
		(e: React.WheelEvent) => {
			e.preventDefault()
			if (isAnimating) return
			const rect = containerRef.current?.getBoundingClientRect()
			if (!rect) return
			const centerPoint = { x: e.clientX - rect.left, y: e.clientY - rect.top }
			e.deltaY > 0 ? handleZoomOut(centerPoint) : handleZoomIn(centerPoint)
		},
		[handleZoomIn, handleZoomOut, isAnimating]
	)

	const handleDoubleClick = useCallback(
		(e: React.MouseEvent) => {
			const rect = containerRef.current?.getBoundingClientRect()
			if (!rect) return
			const centerPoint = { x: e.clientX - rect.left, y: e.clientY - rect.top }
			scale > 1.5 ? animateZoom(1) : animateZoom(3, centerPoint)
		},
		[scale, animateZoom]
	)

	const handleMouseDown = useCallback(
		(e: React.MouseEvent) => {
			if (scale <= 0.5 || isAnimating) return
			e.preventDefault()
			setIsDragging(true)
			setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y })
		},
		[scale, position, isAnimating]
	)

	const handleMouseMove = useCallback(
		(e: React.MouseEvent) => {
			if (!isDragging || scale <= 0.5) return
			setPosition(
				constrainPosition(
					{ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y },
					scale
				)
			)
		},
		[isDragging, dragStart, scale, constrainPosition]
	)

	const handleMouseUp = useCallback(() => setIsDragging(false), [])

	const handleImageLoad = () => {
		if (!imgRef.current) return
		setImageSize({
			width: imgRef.current.naturalWidth,
			height: imgRef.current.naturalHeight,
		})
	}

	return (
		<div className='w-full h-full relative'>
			<div className='flex justify-center gap-2 absolute z-10 right-4 top-4'>
				<Button
					onClick={() => handleZoomOut()}
					variant='outline'
					disabled={scale <= minScale || isAnimating}
					className='h-8'
				>
					<ZoomOut className='h-4 w-4' />
				</Button>
				<div className='text-sm font-mono min-w-[60px] text-center h-8 bg-black/50 text-white flex justify-center items-center rounded-lg'>
					{Math.round(scale * 100) + 60}%
				</div>
				<Button
					variant='outline'
					onClick={() => handleZoomIn()}
					disabled={scale >= maxScale || isAnimating}
					className='h-8'
				>
					<ZoomIn className='h-4 w-4' />
				</Button>
				<Button variant='outline' onClick={handleReset} disabled={isAnimating}>
					<RotateCcw className='h-4 w-4' />
				</Button>
			</div>

			<div
				ref={containerRef}
				className='relative w-full h-full bg-black/50 overflow-hidden border border-gray-200 select-none rounded-l-lg'
				onWheel={handleWheel}
				onMouseDown={handleMouseDown}
				onMouseMove={handleMouseMove}
				onMouseUp={handleMouseUp}
				onMouseLeave={handleMouseUp}
				onDoubleClick={handleDoubleClick}
				style={{
					cursor: scale > 0.5 ? (isDragging ? 'grabbing' : 'grab') : 'zoom-in',
					touchAction: 'none',
				}}
			>
				<div
					className='absolute inset-0 flex items-center justify-center'
					style={{
						transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
						transformOrigin: 'center center',
						transition: isAnimating ? 'transform 0.3s ease-out' : 'none',
					}}
				>
					<img
						ref={imgRef}
						src={url}
						alt='Zoomable image'
						onLoad={handleImageLoad}
						className='max-w-none object-contain'
						draggable={false}
						style={{ pointerEvents: 'none' }}
					/>
				</div>
			</div>
		</div>
	)
}
