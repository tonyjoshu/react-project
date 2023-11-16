import PropTypes from 'prop-types'
import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'

import { CBadge } from '@coreui/react'
import Label from './Label'

export const AppSidebarNav = ({ items }) => {
  const location = useLocation()
  const navLink = (name, icon, badge, activeLink) => {
    return (
      <>
        { icon && (
          <div style={ {
            backgroundColor: activeLink ? '#E21D24' : '',
            border: "1px solid #303B51",
            height: 40,
            aspectRatio: 1,
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 'x-large',
            marginRight: 10

          } }>{ icon }</div>
        ) }
        { name && <Label noWrap color={ activeLink ? "#E21D24" : '' } text={ name } /> }
        { badge && (
          <CBadge
            color={ badge.color }
            className="ms-auto">
            { `${ badge.text }` }
          </CBadge>
        ) }
      </>
    )
  }

  const navItem = (item, index) => {
    const { component, name, badge, icon, ...rest } = item
    const Component = component
    const location = useLocation()

    // const activeLink = Boolean(location.pathname === rest.to)
    const activeLink = Boolean(location.pathname.toLowerCase().includes(rest.to))

    return (
      <Component
        { ...(rest.to &&
          !rest.items && {
          component: NavLink,
        }) }
        key={ index }
        { ...rest }
        style={ {
          backgroundColor: '#141E36',
          position: 'relative'
        } }
      >
        { navLink(name, icon, badge, activeLink) }
        <div style={ {
          position: 'absolute',
          right: 0,
          height: "50%",
          width: 8,
          backgroundColor: activeLink ? '#E21D24' : '',
          borderBottomLeftRadius: "100%",
          borderTopLeftRadius: "100%",
          transition: "0.2s"
        } } />
      </Component>
    )
  }
  const navGroup = (item, index) => {
    const { component, name, icon, to, ...rest } = item
    const Component = component
    return (
      <Component
        idx={ String(index) }
        key={ index }
        toggler={ navLink(name, icon) }
        visible={ location.pathname.startsWith(to) }
        { ...rest }
      >
        { item.items?.map((item, index) =>
          item.items ? navGroup(item, index) : navItem(item, index),
        ) }
      </Component>
    )
  }

  return (
    <div className='scrollbar-hide'>
      { items &&
        items.map((item, index) => (item.items ? navGroup(item, index) : navItem(item, index))) }
    </div>
  )
}

AppSidebarNav.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
}
