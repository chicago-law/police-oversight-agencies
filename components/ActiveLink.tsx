import { withRouter } from 'next/router'
import Link from 'next/link'
import React, { Children } from 'react'
import { WithRouterProps } from 'next/dist/client/with-router'

interface OwnProps {
  href: string;
  activeClassName?: string;
  scroll?: boolean;
  children: React.ReactElement;
}

const ActiveLink: React.FC<OwnProps & WithRouterProps> = ({
  router,
  href,
  activeClassName = 'active',
  scroll = true,
  children,
  ...props
}) => {
  const child = Children.only(children)

  let className = `${child.props.className}` || ''
  if (router.pathname === href && activeClassName) {
    className = `${className} ${activeClassName}`.trim()
  }

  return (
    <Link href={href} scroll={scroll} {...props}>
      {React.cloneElement(child, { className })}
    </Link>
  )
}

export default withRouter(ActiveLink)
