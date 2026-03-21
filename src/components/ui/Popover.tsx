import { useState, cloneElement, isValidElement, type ReactElement } from 'react'
import {
  useFloating,
  useClick,
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

const fadeInPopover = keyframes`
  from { opacity: 0; transform: translateY(4px); }
  to   { opacity: 1; transform: translateY(0); }
`

const PopoverBox = styled.div`
  background: ${({ theme }) => theme.colors.bg};
  border: 0.5px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: 14px;
  max-width: 280px;
  z-index: 9999;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  animation: ${fadeInPopover} 0.15s ease;
  position: relative;
`

const PopoverTitle = styled.p`
  font-size: 13px;
  font-weight: ${({ theme }) => theme.typography.medium};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 6px;
`

const PopoverBody = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.6;
`

const PopoverClose = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 20px;
  height: 20px;
  border: none;
  border-radius: 4px;
  background: transparent;
  color: ${({ theme }) => theme.colors.textTertiary};
  cursor: pointer;
  line-height: 1;
  &:hover { background: ${({ theme }) => theme.colors.bgSecondary}; }
`

interface PopoverProps {
  title: string
  content: string
  children: ReactElement
  placement?: 'top' | 'bottom' | 'left' | 'right'
}

export function Popover({ title, content, children, placement = 'bottom' }: PopoverProps) {
  const [open, setOpen] = useState(false)

  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    placement,
    whileElementsMounted: autoUpdate,
    middleware: [offset(10), flip(), shift({ padding: 8 })],
  })

  const click = useClick(context)
  const dismiss = useDismiss(context)
  const role = useRole(context)

  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss, role])

  if (!isValidElement(children)) return null

  return (
    <>
      {cloneElement(children, {
        ref: refs.setReference,
        ...getReferenceProps(),
      } as never)}
      {open && (
        <FloatingPortal>
          <PopoverBox ref={refs.setFloating} style={floatingStyles} {...getFloatingProps()}>
            <PopoverClose onClick={() => setOpen(false)} aria-label="Close">x</PopoverClose>
            <PopoverTitle>{title}</PopoverTitle>
            <PopoverBody>{content}</PopoverBody>
          </PopoverBox>
        </FloatingPortal>
      )}
    </>
  )
}
