// src/screens/IconsGallery.jsx
// Tela temporária de inventário: 38 ícones do app renderizados em várias bibliotecas.
// Tabs no topo alternam entre Lucide, Heroicons, Phosphor, Feather, Tabler, Font Awesome,
// Material e Bootstrap. Cada card tem download (.svg). Remover junto com a rota e o botão em Profile.
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// ─── Lucide (lucide-react) ─────────────────────────────────────────────
import {
  ChevronLeft, Download,
  ArrowDown as LcArrowDown, ArrowRight as LcArrowRight, ArrowUp as LcArrowUp,
  Beef as LcBeef, Bell as LcBell, Check as LcCheck, ChevronRight as LcChevronRight,
  Circle as LcCircle, Clock as LcClock, Crown as LcCrown, Droplet as LcDroplet,
  Dumbbell as LcDumbbell, Flame as LcFlame, Heart as LcHeart, Home as LcHome,
  LineChart as LcLineChart, ListChecks as LcListChecks, Loader2 as LcLoader2,
  Lock as LcLock, Medal as LcMedal, MessageCircle as LcMessageCircle, Moon as LcMoon,
  MoreHorizontal as LcMoreHorizontal, Pause as LcPause, Play as LcPlay, Plus as LcPlus,
  RefreshCcw as LcRefreshCcw, Send as LcSend, Sun as LcSun, Target as LcTarget,
  Trophy as LcTrophy, User as LcUser, Users as LcUsers, Utensils as LcUtensils,
  UtensilsCrossed as LcUtensilsCrossed, Weight as LcWeight, X as LcX,
  ChevronLeft as LcChevronLeft,
} from 'lucide-react'

// ─── Heroicons v2 outline ──────────────────────────────────────────────
import {
  ArrowDownIcon, ArrowRightIcon, ArrowUpIcon,
  BellIcon, CheckIcon, ChevronLeftIcon, ChevronRightIcon,
  StopCircleIcon, ClockIcon, StarIcon,
  ArrowTrendingUpIcon, QueueListIcon,
  ArrowPathIcon, LockClosedIcon, TrophyIcon,
  ChatBubbleOvalLeftIcon, MoonIcon, EllipsisHorizontalIcon,
  PauseIcon, PlayIcon, PlusIcon, PaperAirplaneIcon, SunIcon,
  UserIcon as HiUserIcon, UsersIcon as HiUsersIcon,
  ScaleIcon, XMarkIcon, FireIcon, HeartIcon,
  HomeIcon as HiHomeIcon,
} from '@heroicons/react/24/outline'

// ─── Feather (react-icons/fi) ──────────────────────────────────────────
import {
  FiArrowDown, FiArrowRight, FiArrowUp, FiBell, FiCheck, FiChevronLeft,
  FiChevronRight, FiCircle, FiClock, FiDroplet, FiHeart, FiHome, FiLoader,
  FiLock, FiAward, FiMessageCircle, FiMoreHorizontal, FiMoon, FiPause, FiPlay,
  FiPlus, FiRefreshCcw, FiSend, FiSun, FiTarget, FiTrendingUp, FiUser, FiUsers, FiX,
} from 'react-icons/fi'

// ─── Phosphor (react-icons/pi) ─────────────────────────────────────────
import {
  PiArrowDown, PiArrowRight, PiArrowUp, PiHamburger,
  PiBell, PiCheck, PiCaretLeft, PiCaretRight, PiCircle, PiClock, PiCrown,
  PiDrop, PiBarbell, PiFire, PiHeart, PiHouse, PiChartLineUp, PiListChecks,
  PiSpinner, PiLock, PiMedal, PiChatCircle, PiMoon, PiDotsThree,
  PiPause, PiPlay, PiPlus, PiArrowsCounterClockwise, PiPaperPlaneRight, PiSun,
  PiTarget, PiTrophy, PiUser, PiUsers, PiForkKnife, PiScales, PiX,
} from 'react-icons/pi'

// ─── Tabler (react-icons/tb) ───────────────────────────────────────────
import {
  TbArrowDown, TbArrowRight, TbArrowUp, TbMeat,
  TbBell, TbCheck, TbChevronLeft, TbChevronRight, TbCircle, TbClock, TbCrown,
  TbDroplet, TbBarbell, TbFlame, TbHeart, TbHome, TbChartLine, TbListCheck,
  TbLoader2, TbLock, TbMedal, TbMessageCircle, TbMoon, TbDots,
  TbPlayerPause, TbPlayerPlay, TbPlus, TbRefresh, TbSend, TbSun,
  TbTarget, TbTrophy, TbUser, TbUsers, TbToolsKitchen2, TbToolsKitchen,
  TbWeight, TbX,
} from 'react-icons/tb'

// ─── Font Awesome 6 (react-icons/fa6) ──────────────────────────────────
import {
  FaArrowDown, FaArrowRight, FaArrowUp, FaDrumstickBite,
  FaBell, FaCheck, FaChevronLeft, FaChevronRight, FaRegCircle, FaClock,
  FaCrown, FaDroplet, FaDumbbell, FaFire, FaRegHeart, FaHouse,
  FaChartLine, FaListCheck, FaSpinner, FaLock, FaMedal, FaMessage, FaMoon,
  FaEllipsis, FaPause, FaPlay, FaPlus, FaArrowsRotate, FaPaperPlane, FaSun,
  FaBullseye, FaTrophy, FaUser, FaUsers, FaUtensils, FaWeightScale, FaXmark,
} from 'react-icons/fa6'

// ─── Material Design (react-icons/md) ──────────────────────────────────
import {
  MdArrowDownward, MdArrowForward, MdArrowUpward,
  MdNotifications, MdCheck, MdChevronLeft, MdChevronRight, MdRadioButtonUnchecked,
  MdAccessTime, MdWaterDrop, MdFitnessCenter, MdLocalFireDepartment,
  MdFavoriteBorder, MdHome, MdShowChart, MdChecklist, MdRefresh, MdLock,
  MdMilitaryTech, MdChatBubbleOutline, MdDarkMode, MdMoreHoriz,
  MdPause, MdPlayArrow, MdAdd, MdSend, MdWbSunny, MdGpsFixed, MdEmojiEvents,
  MdPerson, MdGroup, MdRestaurant, MdRestaurantMenu, MdMonitorWeight, MdClose,
} from 'react-icons/md'

// ─── Bootstrap Icons (react-icons/bs) ──────────────────────────────────
import {
  BsArrowDown, BsArrowRight, BsArrowUp,
  BsBell, BsCheck, BsChevronLeft, BsChevronRight, BsCircle, BsClock,
  BsDroplet, BsFire, BsHeart, BsHouse, BsGraphUp, BsListCheck,
  BsHourglassSplit, BsLock, BsAward, BsChatDots, BsMoon, BsThreeDots,
  BsPause, BsPlay, BsPlus, BsArrowRepeat, BsSend, BsSun, BsBullseye, BsTrophy,
  BsPerson, BsPeople, BsX,
} from 'react-icons/bs'

import DumbbellIcon from '../components/icons/DumbbellIcon.jsx'

// Cada linha = 1 conceito (numeração estável). Colunas = ícone em cada biblioteca.
// null = biblioteca não tem equivalente (mostra "—").
const ICONS = [
  { n: 1,  name: 'ArrowDown',       usedIn: 'Community/RankingView.jsx',
    lucide: LcArrowDown, heroicons: ArrowDownIcon, phosphor: PiArrowDown, feather: FiArrowDown, tabler: TbArrowDown, fontawesome: FaArrowDown, material: MdArrowDownward, bootstrap: BsArrowDown },
  { n: 2,  name: 'ArrowRight',      usedIn: 'ui/SlideToConfirm.jsx',
    lucide: LcArrowRight, heroicons: ArrowRightIcon, phosphor: PiArrowRight, feather: FiArrowRight, tabler: TbArrowRight, fontawesome: FaArrowRight, material: MdArrowForward, bootstrap: BsArrowRight },
  { n: 3,  name: 'ArrowUp',         usedIn: 'Community/RankingView.jsx',
    lucide: LcArrowUp, heroicons: ArrowUpIcon, phosphor: PiArrowUp, feather: FiArrowUp, tabler: TbArrowUp, fontawesome: FaArrowUp, material: MdArrowUpward, bootstrap: BsArrowUp },
  { n: 4,  name: 'Beef',            usedIn: 'ui/Medal.jsx (missão proteína)',
    lucide: LcBeef, heroicons: null, phosphor: PiHamburger, feather: null, tabler: TbMeat, fontawesome: FaDrumstickBite, material: null, bootstrap: null },
  { n: 5,  name: 'Bell',            usedIn: 'Inicio.jsx, Community.jsx',
    lucide: LcBell, heroicons: BellIcon, phosphor: PiBell, feather: FiBell, tabler: TbBell, fontawesome: FaBell, material: MdNotifications, bootstrap: BsBell },
  { n: 6,  name: 'Check',           usedIn: 'Home.jsx, Inicio.jsx, Diet/ClassBadge.jsx, Diet/CompletionOverlay.jsx',
    lucide: LcCheck, heroicons: CheckIcon, phosphor: PiCheck, feather: FiCheck, tabler: TbCheck, fontawesome: FaCheck, material: MdCheck, bootstrap: BsCheck },
  { n: 7,  name: 'ChevronLeft',     usedIn: 'WorkoutDetail.jsx, Achievements/index.jsx',
    lucide: LcChevronLeft, heroicons: ChevronLeftIcon, phosphor: PiCaretLeft, feather: FiChevronLeft, tabler: TbChevronLeft, fontawesome: FaChevronLeft, material: MdChevronLeft, bootstrap: BsChevronLeft },
  { n: 8,  name: 'ChevronRight',    usedIn: 'WorkoutDetail.jsx, Achievements/MissionRow.jsx, ui/ListRow.jsx',
    lucide: LcChevronRight, heroicons: ChevronRightIcon, phosphor: PiCaretRight, feather: FiChevronRight, tabler: TbChevronRight, fontawesome: FaChevronRight, material: MdChevronRight, bootstrap: BsChevronRight },
  { n: 9,  name: 'Circle',          usedIn: 'ui/CheckState.jsx (unchecked)',
    lucide: LcCircle, heroicons: StopCircleIcon, phosphor: PiCircle, feather: FiCircle, tabler: TbCircle, fontawesome: FaRegCircle, material: MdRadioButtonUnchecked, bootstrap: BsCircle },
  { n: 10, name: 'Clock',           usedIn: 'Home.jsx',
    lucide: LcClock, heroicons: ClockIcon, phosphor: PiClock, feather: FiClock, tabler: TbClock, fontawesome: FaClock, material: MdAccessTime, bootstrap: BsClock },
  { n: 11, name: 'Crown',           usedIn: 'Community/RankingView.jsx, Community/PostCard.jsx',
    lucide: LcCrown, heroicons: StarIcon, phosphor: PiCrown, feather: null, tabler: TbCrown, fontawesome: FaCrown, material: null, bootstrap: null },
  { n: 12, name: 'Droplet',         usedIn: 'Inicio.jsx, Diet/WaterCard.jsx, Diet/water/WaterGlassButton.jsx, ui/Medal.jsx',
    lucide: LcDroplet, heroicons: null, phosphor: PiDrop, feather: FiDroplet, tabler: TbDroplet, fontawesome: FaDroplet, material: MdWaterDrop, bootstrap: BsDroplet },
  { n: 13, name: 'Dumbbell',        usedIn: 'Inicio.jsx, BottomNav.jsx (tab treino), ui/Medal.jsx',
    lucide: LcDumbbell, heroicons: null, phosphor: PiBarbell, feather: null, tabler: TbBarbell, fontawesome: FaDumbbell, material: MdFitnessCenter, bootstrap: null },
  { n: 14, name: 'Flame',           usedIn: 'Diet/ClassPanel.jsx, ui/Medal.jsx',
    lucide: LcFlame, heroicons: FireIcon, phosphor: PiFire, feather: null, tabler: TbFlame, fontawesome: FaFire, material: MdLocalFireDepartment, bootstrap: BsFire },
  { n: 15, name: 'Heart',           usedIn: 'Inicio.jsx, Community/PostCard.jsx, ui/Medal.jsx',
    lucide: LcHeart, heroicons: HeartIcon, phosphor: PiHeart, feather: FiHeart, tabler: TbHeart, fontawesome: FaRegHeart, material: MdFavoriteBorder, bootstrap: BsHeart },
  { n: 16, name: 'Home',            usedIn: 'BottomNav.jsx (tab início)',
    lucide: LcHome, heroicons: HiHomeIcon, phosphor: PiHouse, feather: FiHome, tabler: TbHome, fontawesome: FaHouse, material: MdHome, bootstrap: BsHouse },
  { n: 17, name: 'LineChart',       usedIn: 'ui/Medal.jsx',
    lucide: LcLineChart, heroicons: ArrowTrendingUpIcon, phosphor: PiChartLineUp, feather: FiTrendingUp, tabler: TbChartLine, fontawesome: FaChartLine, material: MdShowChart, bootstrap: BsGraphUp },
  { n: 18, name: 'ListChecks',      usedIn: 'ui/Medal.jsx',
    lucide: LcListChecks, heroicons: QueueListIcon, phosphor: PiListChecks, feather: null, tabler: TbListCheck, fontawesome: FaListCheck, material: MdChecklist, bootstrap: BsListCheck },
  { n: 19, name: 'Loader2',         usedIn: 'ui/SlideToConfirm.jsx (spinner)',
    lucide: LcLoader2, heroicons: ArrowPathIcon, phosphor: PiSpinner, feather: FiLoader, tabler: TbLoader2, fontawesome: FaSpinner, material: MdRefresh, bootstrap: BsHourglassSplit },
  { n: 20, name: 'Lock',            usedIn: 'Home.jsx, Diet/ClassBadge.jsx',
    lucide: LcLock, heroicons: LockClosedIcon, phosphor: PiLock, feather: FiLock, tabler: TbLock, fontawesome: FaLock, material: MdLock, bootstrap: BsLock },
  { n: 21, name: 'Medal',           usedIn: 'Community/PostCard.jsx (badge do autor)',
    lucide: LcMedal, heroicons: TrophyIcon, phosphor: PiMedal, feather: FiAward, tabler: TbMedal, fontawesome: FaMedal, material: MdMilitaryTech, bootstrap: BsAward },
  { n: 22, name: 'MessageCircle',   usedIn: 'Inicio.jsx, Community/PostCard.jsx, ui/Medal.jsx',
    lucide: LcMessageCircle, heroicons: ChatBubbleOvalLeftIcon, phosphor: PiChatCircle, feather: FiMessageCircle, tabler: TbMessageCircle, fontawesome: FaMessage, material: MdChatBubbleOutline, bootstrap: BsChatDots },
  { n: 23, name: 'Moon',            usedIn: 'Profile/ProfileIdentityCard.jsx (tema escuro)',
    lucide: LcMoon, heroicons: MoonIcon, phosphor: PiMoon, feather: FiMoon, tabler: TbMoon, fontawesome: FaMoon, material: MdDarkMode, bootstrap: BsMoon },
  { n: 24, name: 'MoreHorizontal',  usedIn: 'Community/PostCard.jsx, WorkoutDetail.jsx',
    lucide: LcMoreHorizontal, heroicons: EllipsisHorizontalIcon, phosphor: PiDotsThree, feather: FiMoreHorizontal, tabler: TbDots, fontawesome: FaEllipsis, material: MdMoreHoriz, bootstrap: BsThreeDots },
  { n: 25, name: 'Pause',           usedIn: 'WorkoutDetail.jsx',
    lucide: LcPause, heroicons: PauseIcon, phosphor: PiPause, feather: FiPause, tabler: TbPlayerPause, fontawesome: FaPause, material: MdPause, bootstrap: BsPause },
  { n: 26, name: 'Play',            usedIn: 'Home.jsx, ui/HeroWorkoutCard.jsx, WorkoutDetail.jsx',
    lucide: LcPlay, heroicons: PlayIcon, phosphor: PiPlay, feather: FiPlay, tabler: TbPlayerPlay, fontawesome: FaPlay, material: MdPlayArrow, bootstrap: BsPlay },
  { n: 27, name: 'Plus',            usedIn: 'Profile/index.jsx, Diet/WaterCard.jsx',
    lucide: LcPlus, heroicons: PlusIcon, phosphor: PiPlus, feather: FiPlus, tabler: TbPlus, fontawesome: FaPlus, material: MdAdd, bootstrap: BsPlus },
  { n: 28, name: 'RefreshCcw',      usedIn: 'Diet/FoodRow.jsx (trocar alimento)',
    lucide: LcRefreshCcw, heroicons: ArrowPathIcon, phosphor: PiArrowsCounterClockwise, feather: FiRefreshCcw, tabler: TbRefresh, fontawesome: FaArrowsRotate, material: MdRefresh, bootstrap: BsArrowRepeat },
  { n: 29, name: 'Send',            usedIn: 'ui/Medal.jsx',
    lucide: LcSend, heroicons: PaperAirplaneIcon, phosphor: PiPaperPlaneRight, feather: FiSend, tabler: TbSend, fontawesome: FaPaperPlane, material: MdSend, bootstrap: BsSend },
  { n: 30, name: 'Sun',             usedIn: 'Profile/ProfileIdentityCard.jsx (tema claro)',
    lucide: LcSun, heroicons: SunIcon, phosphor: PiSun, feather: FiSun, tabler: TbSun, fontawesome: FaSun, material: MdWbSunny, bootstrap: BsSun },
  { n: 31, name: 'Target',          usedIn: 'ui/Medal.jsx',
    lucide: LcTarget, heroicons: null, phosphor: PiTarget, feather: FiTarget, tabler: TbTarget, fontawesome: FaBullseye, material: MdGpsFixed, bootstrap: BsBullseye },
  { n: 32, name: 'Trophy',          usedIn: 'ui/Medal.jsx (fallback)',
    lucide: LcTrophy, heroicons: TrophyIcon, phosphor: PiTrophy, feather: FiAward, tabler: TbTrophy, fontawesome: FaTrophy, material: MdEmojiEvents, bootstrap: BsTrophy },
  { n: 33, name: 'User',            usedIn: 'BottomNav.jsx (tab perfil)',
    lucide: LcUser, heroicons: HiUserIcon, phosphor: PiUser, feather: FiUser, tabler: TbUser, fontawesome: FaUser, material: MdPerson, bootstrap: BsPerson },
  { n: 34, name: 'Users',           usedIn: 'BottomNav.jsx (tab comunidade)',
    lucide: LcUsers, heroicons: HiUsersIcon, phosphor: PiUsers, feather: FiUsers, tabler: TbUsers, fontawesome: FaUsers, material: MdGroup, bootstrap: BsPeople },
  { n: 35, name: 'Utensils',        usedIn: 'ui/Medal.jsx',
    lucide: LcUtensils, heroicons: null, phosphor: PiForkKnife, feather: null, tabler: TbToolsKitchen2, fontawesome: FaUtensils, material: MdRestaurant, bootstrap: null },
  { n: 36, name: 'UtensilsCrossed', usedIn: 'Inicio.jsx, BottomNav.jsx (tab dieta)',
    lucide: LcUtensilsCrossed, heroicons: null, phosphor: PiForkKnife, feather: null, tabler: TbToolsKitchen, fontawesome: FaUtensils, material: MdRestaurantMenu, bootstrap: null },
  { n: 37, name: 'Weight',          usedIn: 'ui/Medal.jsx',
    lucide: LcWeight, heroicons: ScaleIcon, phosphor: PiScales, feather: null, tabler: TbWeight, fontawesome: FaWeightScale, material: MdMonitorWeight, bootstrap: null },
  { n: 38, name: 'X',               usedIn: 'Diet/SubstitutePopover.jsx, Diet/water/WaterDialog.jsx',
    lucide: LcX, heroicons: XMarkIcon, phosphor: PiX, feather: FiX, tabler: TbX, fontawesome: FaXmark, material: MdClose, bootstrap: BsX },
]

const LIBRARIES = [
  { id: 'lucide',      label: 'Lucide' },
  { id: 'heroicons',   label: 'Heroicons' },
  { id: 'phosphor',    label: 'Phosphor' },
  { id: 'feather',     label: 'Feather' },
  { id: 'tabler',      label: 'Tabler' },
  { id: 'fontawesome', label: 'Font Awesome' },
  { id: 'material',    label: 'Material' },
  { id: 'bootstrap',   label: 'Bootstrap' },
]

const CUSTOM_SVG_ICONS = [
  {
    n: 39,
    name: 'DumbbellIcon',
    file: 'src/components/icons/DumbbellIcon.jsx',
    note: 'SVG próprio (não importado em nenhuma tela).',
    render: () => <DumbbellIcon className="h-6 w-6 text-ink" />,
  },
]

const MEDAL_ASSETS = [
  { n: 40, name: 'bronze',   file: '/images/medals/bronze.webp' },
  { n: 41, name: 'prata',    file: '/images/medals/prata.webp' },
  { n: 42, name: 'ouro',     file: '/images/medals/ouro.webp' },
  { n: 43, name: 'diamante', file: '/images/medals/diamante.webp' },
  { n: 44, name: 'locked',   file: '/images/medals/locked.webp' },
]

// ─── Downloads ────────────────────────────────────────────────────────────
function triggerDownload(blob, filename) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

function downloadSvgFromNode(node, filename) {
  const svg = node?.querySelector('svg')
  if (!svg) return
  const clone = svg.cloneNode(true)
  clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
  if (!clone.getAttribute('viewBox')) clone.setAttribute('viewBox', '0 0 24 24')
  clone.removeAttribute('class')
  const source = new XMLSerializer().serializeToString(clone)
  const blob = new Blob([`<?xml version="1.0" encoding="UTF-8"?>\n${source}`], {
    type: 'image/svg+xml;charset=utf-8',
  })
  triggerDownload(blob, filename)
}

async function downloadAsset(url, filename) {
  const res = await fetch(url)
  const blob = await res.blob()
  triggerDownload(blob, filename)
}

// ─── Renderização por biblioteca ─────────────────────────────────────────
// Cada família tem props diferentes de tamanho/traço. Uniformizo pra ficar visualmente comparável.
function renderIcon(Icon, libId) {
  if (!Icon) return <span className="text-[18px] text-muted">—</span>
  if (libId === 'heroicons') return <Icon className="h-[26px] w-[26px] text-ink" />
  if (libId === 'lucide')    return <Icon size={26} strokeWidth={1.75} />
  return <Icon size={26} /> // react-icons (fi/pi/tb/fa6/md/bs)
}

// ─── Componentes ─────────────────────────────────────────────────────────
function IconCell({ n, name, subtitle, filename, assetUrl, children, disabled }) {
  const iconRef = useRef(null)

  const handleDownload = () => {
    if (disabled) return
    if (assetUrl) downloadAsset(assetUrl, filename)
    else downloadSvgFromNode(iconRef.current, filename)
  }

  return (
    <div className="relative flex flex-col items-center gap-2 rounded-2xl border border-line bg-surface p-3">
      <button
        type="button"
        onClick={handleDownload}
        disabled={disabled}
        aria-label={`Baixar ${name}`}
        className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full border border-line bg-canvas text-muted transition hover:text-ink active:scale-90 disabled:opacity-30"
      >
        <Download size={13} strokeWidth={2} />
      </button>
      <div className="text-[10px] font-semibold text-muted">#{n}</div>
      <div ref={iconRef} className="grid h-14 w-14 place-items-center rounded-xl bg-canvas text-ink">
        {children}
      </div>
      <div className="w-full text-center">
        <div className="truncate text-[12px] font-semibold text-ink">{name}</div>
        {subtitle && (
          <div className="mt-0.5 line-clamp-2 text-[10px] leading-tight text-muted">
            {subtitle}
          </div>
        )}
      </div>
    </div>
  )
}

function SectionHeader({ label, count, action }) {
  return (
    <div className="flex items-end justify-between gap-3">
      <div>
        <div className="text-[10.5px] font-semibold uppercase tracking-[0.1em] text-muted">
          {label}
        </div>
        <div className="text-[12px] text-muted">
          {count} {count === 1 ? 'ícone' : 'ícones'}
        </div>
      </div>
      {action}
    </div>
  )
}

export default function IconsGallery() {
  const navigate = useNavigate()
  const [lib, setLib] = useState('lucide')
  const gridRef = useRef(null)
  const customRef = useRef(null)

  const currentLibLabel = LIBRARIES.find((l) => l.id === lib)?.label ?? lib

  const downloadAllVisible = () => {
    const cells = gridRef.current?.querySelectorAll('[data-icon-cell]:not([data-disabled])')
    if (!cells) return
    cells.forEach((cell, i) => {
      const filename = cell.getAttribute('data-filename') || `icon-${i + 1}.svg`
      setTimeout(() => downloadSvgFromNode(cell, filename), i * 80)
    })
  }

  const downloadAllCustom = () => {
    const cells = customRef.current?.querySelectorAll('[data-icon-cell]')
    if (!cells) return
    cells.forEach((cell, i) => {
      const filename = cell.getAttribute('data-filename') || `custom-${i + 1}.svg`
      setTimeout(() => downloadSvgFromNode(cell, filename), i * 80)
    })
  }

  return (
    <div className="no-scrollbar h-full overflow-y-auto pt-[68px] pb-[110px]">
      <div className="flex flex-col gap-6 px-[18px]">
        {/* Header */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate('/perfil')}
            aria-label="Voltar ao perfil"
            className="grid h-[42px] w-[42px] shrink-0 place-items-center rounded-full border border-line bg-surface text-ink transition active:scale-95"
          >
            <ChevronLeft size={20} strokeWidth={2} />
          </button>
          <div>
            <h1 className="text-[24px] font-extrabold tracking-[-0.4px] text-ink">
              Ícones do app
            </h1>
            <p className="text-[12px] text-muted">
              {ICONS.length + CUSTOM_SVG_ICONS.length + MEDAL_ASSETS.length} itens · comparando bibliotecas
            </p>
          </div>
        </div>

        {/* Tabs de biblioteca */}
        <div className="-mx-[18px]">
          <div className="no-scrollbar flex gap-2 overflow-x-auto px-[18px]">
            {LIBRARIES.map((l) => {
              const active = l.id === lib
              return (
                <button
                  key={l.id}
                  type="button"
                  onClick={() => setLib(l.id)}
                  className={
                    'shrink-0 rounded-full border px-3.5 py-1.5 text-[12px] font-semibold transition active:scale-95 ' +
                    (active
                      ? 'border-ink bg-ink text-canvas'
                      : 'border-line bg-surface text-muted hover:text-ink')
                  }
                >
                  {l.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Seção 1: Grid da biblioteca selecionada */}
        <section className="flex flex-col gap-3">
          <SectionHeader
            label={`${currentLibLabel} — 38 ícones`}
            count={ICONS.filter((i) => i[lib]).length}
            action={
              <button
                type="button"
                onClick={downloadAllVisible}
                className="flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1.5 text-[11px] font-semibold text-ink transition active:scale-95"
              >
                <Download size={12} strokeWidth={2} />
                Baixar todos
              </button>
            }
          />
          <div ref={gridRef} className="grid grid-cols-3 gap-3">
            {ICONS.map((row) => {
              const Icon = row[lib]
              const disabled = !Icon
              const filename = `${String(row.n).padStart(2, '0')}-${row.name}-${lib}.svg`
              return (
                <div
                  key={row.n}
                  data-icon-cell
                  data-filename={filename}
                  {...(disabled ? { 'data-disabled': '' } : {})}
                >
                  <IconCell
                    n={row.n}
                    name={row.name}
                    subtitle={row.usedIn}
                    filename={filename}
                    disabled={disabled}
                  >
                    {renderIcon(Icon, lib)}
                  </IconCell>
                </div>
              )
            })}
          </div>
        </section>

        {/* Seção 2: SVG customizados (não muda com tab) */}
        <section className="flex flex-col gap-3">
          <SectionHeader
            label="SVG customizados"
            count={CUSTOM_SVG_ICONS.length}
            action={
              <button
                type="button"
                onClick={downloadAllCustom}
                className="flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1.5 text-[11px] font-semibold text-ink transition active:scale-95"
              >
                <Download size={12} strokeWidth={2} />
                Baixar todos
              </button>
            }
          />
          <div ref={customRef} className="grid grid-cols-3 gap-3">
            {CUSTOM_SVG_ICONS.map(({ n, name, file, note, render }) => {
              const filename = `${String(n).padStart(2, '0')}-${name}.svg`
              return (
                <div key={n} data-icon-cell data-filename={filename}>
                  <IconCell
                    n={n}
                    name={name}
                    subtitle={`${file}${note ? ' — ' + note : ''}`}
                    filename={filename}
                  >
                    {render()}
                  </IconCell>
                </div>
              )
            })}
          </div>
        </section>

        {/* Seção 3: Medalhas (webp) */}
        <section className="flex flex-col gap-3">
          <SectionHeader label="Medalhas (.webp)" count={MEDAL_ASSETS.length} />
          <div className="grid grid-cols-3 gap-3">
            {MEDAL_ASSETS.map(({ n, name, file }) => {
              const filename = `${String(n).padStart(2, '0')}-${name}.webp`
              return (
                <IconCell
                  key={n}
                  n={n}
                  name={name}
                  subtitle={file}
                  filename={filename}
                  assetUrl={file}
                >
                  <img src={file} alt="" width={48} height={48} className="h-12 w-12 object-contain" />
                </IconCell>
              )
            })}
          </div>
        </section>
      </div>
    </div>
  )
}
