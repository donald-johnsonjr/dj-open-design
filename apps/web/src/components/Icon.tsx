import type { SVGProps } from 'react';
import {
  ArrowClockwise,
  ArrowLeft,
  ArrowSquareOut,
  ArrowUp,
  ArrowsClockwise,
  ArrowsIn,
  ArrowsOut,
  Bell,
  Cards,
  CaretDown,
  CaretLeft,
  CaretRight,
  ChatCircle,
  Check,
  CircleNotch,
  ClockCounterClockwise,
  Copy,
  DeviceMobile,
  DiscordLogo,
  DotsSixVertical,
  DotsThree,
  DownloadSimple,
  Eye,
  EyeSlash,
  Faders,
  File,
  FileCode,
  FileText,
  Folder,
  Gear,
  GitFork,
  GithubLogo,
  Globe,
  GridFour,
  Hammer,
  House,
  Image,
  Info,
  Kanban,
  Layout,
  Lightbulb,
  LinkSimple,
  Lock,
  MagnifyingGlass,
  MagnifyingGlassMinus,
  MagnifyingGlassPlus,
  Microphone,
  Minus,
  Moon,
  PaintBucket,
  Palette,
  PaperPlaneRight,
  Paperclip,
  PencilSimple,
  PencilSimpleLine,
  Planet,
  Play,
  PlugsConnected,
  Plus,
  PlusCircle,
  Presentation,
  PuzzlePiece,
  Question,
  Share,
  SidebarSimple,
  SignIn,
  SignOut,
  Sliders,
  Sparkle,
  SpeakerHigh,
  SquaresFour,
  Stack,
  Star,
  Stop,
  Sun,
  SunHorizon,
  Swatches,
  Terminal,
  ThumbsDown,
  ThumbsUp,
  Translate,
  Trash,
  UploadSimple,
  Warning,
  X,
  type Icon as PhosphorIcon,
  type IconWeight,
} from '@phosphor-icons/react';

export type IconName =
  | 'alert-triangle'
  | 'arrow-left'
  | 'arrow-up'
  | 'attach'
  | 'bell'
  | 'blocks'
  | 'check'
  | 'chevron-down'
  | 'chevron-left'
  | 'chevron-right'
  | 'close'
  | 'copy'
  | 'comment'
  | 'discord'
  | 'download'
  | 'draw'
  | 'edit'
  | 'external-link'
  | 'eye'
  | 'eye-off'
  | 'file'
  | 'file-code'
  | 'file-text'
  | 'folder'
  | 'folder-filled'
  | 'fork'
  | 'github'
  | 'github-filled'
  | 'grip-vertical'
  | 'grid'
  | 'globe'
  | 'hammer'
  | 'help-circle'
  | 'history'
  | 'home'
  | 'home-filled'
  | 'image'
  | 'import'
  | 'info'
  | 'kanban'
  | 'layers-filled'
  | 'languages'
  | 'layout'
  | 'lightbulb'
  | 'link'
  | 'lock'
  | 'log-out'
  | 'integrations-filled'
  | 'maximize'
  | 'mic'
  | 'minimize'
  | 'minus'
  | 'more-horizontal'
  | 'orbit'
  | 'paint-bucket'
  | 'panel-left'
  | 'palette'
  | 'palette-filled'
  | 'pencil'
  | 'plus'
  | 'plus-filled'
  | 'puzzle'
  | 'slides'
  | 'star'
  | 'swatchbook'
  | 'play'
  | 'present'
  | 'refresh'
  | 'reload'
  | 'search'
  | 'send'
  | 'settings'
  | 'share'
  | 'sliders'
  | 'smartphone'
  | 'spinner'
  | 'sparkles'
  | 'stop'
  | 'sun'
  | 'moon'
  | 'sun-moon'
  | 'terminal'
  | 'thumbs-down'
  | 'thumbs-up'
  | 'tweaks'
  | 'upload'
  | 'trash'
  | 'volume'
  | 'zoom-in'
  | 'zoom-out';

interface Props extends Omit<SVGProps<SVGSVGElement>, 'name'> {
  name: IconName;
  size?: number | string;
}

/**
 * Design-system icon set backed by Phosphor (`@phosphor-icons/react`). Icons
 * inherit `currentColor` and are `aria-hidden` by default — use inside controls
 * that already carry an accessible label. `weight: 'regular'` is the house
 * default; a small, deliberate set of brand/feature moments opt into `'fill'`
 * (see `FILLED`) so the glyph reads with intent rather than as decoration.
 *
 * The `ICONS` map is typed `Record<IconName, PhosphorIcon>`, so every union
 * member is exhaustively covered at compile time — adding a name to `IconName`
 * without a mapping is a typecheck error, not a silent runtime `null`.
 */
const ICONS: Record<IconName, PhosphorIcon> = {
  'alert-triangle': Warning,
  'arrow-left': ArrowLeft,
  'arrow-up': ArrowUp,
  attach: Paperclip,
  bell: Bell,
  blocks: SquaresFour,
  check: Check,
  'chevron-down': CaretDown,
  'chevron-left': CaretLeft,
  'chevron-right': CaretRight,
  close: X,
  copy: Copy,
  comment: ChatCircle,
  discord: DiscordLogo,
  download: DownloadSimple,
  draw: PencilSimpleLine,
  edit: PencilSimple,
  'external-link': ArrowSquareOut,
  eye: Eye,
  'eye-off': EyeSlash,
  file: File,
  'file-code': FileCode,
  'file-text': FileText,
  folder: Folder,
  'folder-filled': Folder,
  fork: GitFork,
  github: GithubLogo,
  'github-filled': GithubLogo,
  'grip-vertical': DotsSixVertical,
  grid: GridFour,
  globe: Globe,
  hammer: Hammer,
  'help-circle': Question,
  history: ClockCounterClockwise,
  home: House,
  'home-filled': House,
  image: Image,
  import: SignIn,
  info: Info,
  kanban: Kanban,
  'layers-filled': Stack,
  languages: Translate,
  layout: Layout,
  lightbulb: Lightbulb,
  link: LinkSimple,
  lock: Lock,
  'log-out': SignOut,
  'integrations-filled': PlugsConnected,
  maximize: ArrowsOut,
  mic: Microphone,
  minimize: ArrowsIn,
  minus: Minus,
  'more-horizontal': DotsThree,
  orbit: Planet,
  'paint-bucket': PaintBucket,
  'panel-left': SidebarSimple,
  palette: Palette,
  'palette-filled': Palette,
  pencil: PencilSimple,
  plus: Plus,
  'plus-filled': PlusCircle,
  puzzle: PuzzlePiece,
  slides: Cards,
  star: Star,
  swatchbook: Swatches,
  play: Play,
  present: Presentation,
  refresh: ArrowsClockwise,
  reload: ArrowClockwise,
  search: MagnifyingGlass,
  send: PaperPlaneRight,
  settings: Gear,
  share: Share,
  sliders: Sliders,
  smartphone: DeviceMobile,
  spinner: CircleNotch,
  sparkles: Sparkle,
  stop: Stop,
  sun: Sun,
  moon: Moon,
  'sun-moon': SunHorizon,
  terminal: Terminal,
  'thumbs-down': ThumbsDown,
  'thumbs-up': ThumbsUp,
  tweaks: Faders,
  upload: UploadSimple,
  trash: Trash,
  volume: SpeakerHigh,
  'zoom-in': MagnifyingGlassPlus,
  'zoom-out': MagnifyingGlassMinus,
};

/**
 * Names that render `weight="fill"` instead of the `regular` house default.
 * Kept intentionally short — the `-filled` variants plus a handful of brand /
 * feature glyphs (Send pill, sparkles, star, play/stop transport) where fill
 * reads better against the dark editorial surface.
 */
const FILLED: ReadonlySet<IconName> = new Set<IconName>([
  'folder-filled',
  'github-filled',
  'home-filled',
  'layers-filled',
  'palette-filled',
  'plus-filled',
  'integrations-filled',
  'send',
  'sparkles',
  'star',
  'play',
  'stop',
]);

export function Icon({ name, size = 14, ...rest }: Props) {
  const Glyph = ICONS[name];
  if (!Glyph) return null;
  const weight: IconWeight = FILLED.has(name) ? 'fill' : 'regular';

  // The spinner keeps its rotation via the existing global `.icon-spin` class,
  // merged after the caller's className so both survive.
  if (name === 'spinner') {
    return (
      <Glyph
        size={size}
        weight={weight}
        aria-hidden
        focusable={false}
        {...rest}
        className={`icon-spin ${rest.className ?? ''}`.trim()}
      />
    );
  }

  return (
    <Glyph
      size={size}
      weight={weight}
      aria-hidden
      focusable={false}
      {...rest}
    />
  );
}
