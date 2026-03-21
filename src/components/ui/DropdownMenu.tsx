import { useState, cloneElement, isValidElement, type ReactElement, type ReactNode } from 'react'
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

const fadeInDropdown = keyframes`
  from { opacity: 0; transform: translateY(-2px); }
  to   { opacity: 1; transform: translateY(0); }
`

const DropdownBox = styled.div`
  background: ${({ theme }) => theme.colors.bg};
  border: 0.5px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 6px;
  min-width: 180px;
  z-index: 9999;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  animation: ${fadeInDropdown} 0.15s ease;
`

const DropdownItem = styled.button<{ $danger?: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 8px 10px;
  border-radius: 6px;
  border: none;
  background: none;
  font-size: 13px;
  color: ${({ $danger, theme }) => ($danger ? theme.colors.error : theme.colors.text)};
  cursor: pointer;
  text-align: left;
  transition: background 0.1s ease;

  &:hover {
    background: ${({ $danger, theme }) => ($danger ? theme.colors.errorBg : theme.colors.bgSecondary)};
  }
`

const DropdownDivider = styled.div`
  height: 0.5px;
  background: ${({ theme }) => theme.colors.border};
  margin: 4px 0;
`

export interface DropdownMenuItem {
  label: string
  icon?: ReactNode
  onClick: () => void
  danger?: boolean
  dividerBefore?: boolean
}

interface DropdownMenuProps {
  items: DropdownMenuItem[]
  children: ReactElement
  placement?: 'bottom-end' | 'bottom-start' | 'bottom'
}

export function DropdownMenu({ items, children, placement = 'bottom-end' }: DropdownMenuProps) {
  const [open, setOpen] = useState(false)

  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    placement,
    whileElementsMounted: autoUpdate,
    middleware: [offset(6), flip(), shift({ padding: 8 })],
  })

  const click = useClick(context)
  const dismiss = useDismiss(context)
  const role = useRole(context, { role: 'menu' })

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
          <DropdownBox ref={refs.setFloating} style={floatingStyles} {...getFloatingProps()}>
            {items.map((item, i) => (
              <div key={`${item.label}-${i}`}>
                {item.dividerBefore && <DropdownDivider />}
                <DropdownItem
                  $danger={item.danger}
                  onClick={() => {
                    item.onClick()
                    setOpen(false)
                  }}
                >
                  {item.icon}
                  {item.label}
                </DropdownItem>
              </div>
            ))}
          </DropdownBox>
        </FloatingPortal>
      )}
    </>
  )
}
