import { useState, cloneElement, isValidElement, type ReactElement } from 'react'
import {
  useFloating,
  useHover,
  useFocus,
  useDismiss,
  useRole,
  useInteractions,
  FloatingPortal,
  offset,
  flip,
  shift,
  autoUpdate,
} from '@floating-ui/react'
import styled, { keyframes } from 'styled-components'

const fadeInTooltip = keyframes`
  from { opacity: 0; transform: scale(0.95); }
  to   { opacity: 1; transform: scale(1); }
`

const TooltipBox = styled.div`
  background: #1a1a1a;
  color: #ffffff;
  font-size: 12px;
  line-height: 1.5;
  padding: 6px 10px;
  border-radius: 6px;
  max-width: 220px;
  z-index: 9999;
  animation: ${fadeInTooltip} 0.15s ease;
  pointer-events: none;
`

interface TooltipProps {
  content: string
  children: ReactElement
  placement?: 'top' | 'bottom' | 'left' | 'right'
}

export function Tooltip({ content, children, placement = 'top' }: TooltipProps) {
  const [open, setOpen] = useState(false)

  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    placement,
    whileElementsMounted: autoUpdate,
    middleware: [offset(8), flip(), shift({ padding: 8 })],
  })

  const hover = useHover(context, { move: false })
  const focus = useFocus(context)
  const dismiss = useDismiss(context)
  const role = useRole(context, { role: 'tooltip' })

  const { getReferenceProps, getFloatingProps } = useInteractions([hover, focus, dismiss, role])

  if (!isValidElement(children)) return null

  return (
    <>
      {cloneElement(children, {
        ref: refs.setReference,
        ...getReferenceProps(),
      } as never)}
      {open && (
        <FloatingPortal>
          <TooltipBox ref={refs.setFloating} style={floatingStyles} {...getFloatingProps()}>
            {content}
          </TooltipBox>
        </FloatingPortal>
      )}
    </>
  )
}
