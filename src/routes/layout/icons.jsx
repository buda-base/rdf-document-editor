import React from "react"
import { Img } from "react-image"
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline"
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline"
export { default as ErrorIcon } from "@mui/icons-material/Error"
export { default as CloseIcon } from "@mui/icons-material/Close"
export { default as SearchIcon } from "@mui/icons-material/FindReplace"
export { default as LookupIcon } from "@mui/icons-material/Search"
export { default as LaunchIcon } from "@mui/icons-material/Launch"
export { default as InfoIcon } from "@mui/icons-material/Info"
export { default as InfoOutlinedIcon } from "@mui/icons-material/InfoOutlined"
export { default as SettingsIcon } from "@mui/icons-material/Settings"
export { default as VisibilityIcon } from "@mui/icons-material/Visibility"
export { default as VisibilityOffIcon } from "@mui/icons-material/VisibilityOff"
export { default as EditIcon } from "@mui/icons-material/Edit"
export { default as KeyboardIcon } from "@mui/icons-material/Keyboard"
export { default as HelpIcon } from "@mui/icons-material/Help"
export { default as ContentPasteIcon } from "@mui/icons-material/AssignmentReturned"

export const PersonIcon = (props) => <Img src="/icons/person.svg" {...props} />
export const WorkIcon = (props) => <Img src="/icons/work.svg" {...props} />
export const PlaceIcon = (props) => <Img src="/icons/place.svg" {...props} />
export const VersionIcon = (props) => <Img src="/icons/instance.svg" {...props} />

export const MDIcon = (props) => <Img src="/icons/Markdown-mark.svg" {...props} />

export const AddIcon = AddCircleOutlineIcon
export const RemoveIcon = RemoveCircleOutlineIcon
