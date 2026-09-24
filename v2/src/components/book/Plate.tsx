import type { Chapter } from '@/data/chapters';
import s from './Book.module.css';

/* The illustration on the left page. Until the art exists, the plate
   shows its numeral and caption over a tinted night sky. */
export default function Plate({ chapter }: { chapter: Chapter }) {
  const { image, caption } = chapter.plate;
  return (
    <figure className={s.plate} data-scene={chapter.id}>
      {image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img className={s.plateImg} src={image} alt={caption} />
      ) : (
        <div className={s.plateArt} aria-hidden="true">
          <span className={s.plateNumeral}>{chapter.numeral}</span>
        </div>
      )}
      <figcaption className={s.plateCaption}>
        <span className={s.plateLabel}>Plate {chapter.numeral}</span>
        {caption}
      </figcaption>
    </figure>
  );
}
