import { DragonSilhouette } from './Dragon';
import s from './Scene.module.css';

/* The view from the balcony, as depth layers (back → front).
   The camera is CSS: each layer moves by its own amount when an
   ancestor's data-stage changes (see Scene.module.css).
   Everything here is placeholder until the art stage. */
export default function Scene() {
  return (
    <div className={s.scene} aria-hidden="true">
      <div className={`${s.layer} ${s.sky}`} />
      <div className={`${s.layer} ${s.auraLayer}`}>
        <div className={s.aura} />
      </div>
      <div className={`${s.layer} ${s.far}`} />
      <div className={`${s.layer} ${s.near}`} />
      <div className={`${s.layer} ${s.railing}`}>
        <div className={s.dragon}>
          <DragonSilhouette />
        </div>
      </div>
      <div className={`${s.layer} ${s.table}`} />
    </div>
  );
}
