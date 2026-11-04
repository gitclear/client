import icons from '../../data/client-icons.json';
import type { Client } from '../../data/clients';

const clientIcons: Record<string, { file: string }> = icons;

export default function ClientIcon({ client, tile = false }: { client: Client; tile?: boolean }) {
  const size = tile ? 48 : 72;
  return <span className={tile ? 'tile-icon' : 'client-icon'} aria-hidden="true">
    <img src={`/images/clients/icons/${clientIcons[client.id].file}`} alt="" width={size} height={size} decoding="async" />
  </span>;
}
