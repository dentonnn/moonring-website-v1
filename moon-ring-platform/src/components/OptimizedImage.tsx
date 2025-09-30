import Image, { ImageProps } from 'next/image'

interface OptimizedImageProps extends Omit<ImageProps, 'src'> {
  src: string
  fallback?: string
}

/**
 * Optimized image component with automatic WebP handling
 *
 * Usage:
 * <OptimizedImage
 *   src="/images/blog/my-post.webp"
 *   alt="Blog post featured image"
 *   width={1200}
 *   height={630}
 * />
 */
export default function OptimizedImage({
  src,
  alt,
  fallback,
  ...props
}: OptimizedImageProps) {
  // If no image provided, use fallback or placeholder
  const imageSrc = src || fallback || '/images/placeholder.svg'

  return (
    <Image
      src={imageSrc}
      alt={alt}
      {...props}
      // Automatically optimize images
      quality={90}
      // Add loading optimization
      loading={props.priority ? undefined : 'lazy'}
    />
  )
}