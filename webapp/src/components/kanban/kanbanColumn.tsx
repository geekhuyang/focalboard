// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
import React from 'react'
import {useDrop} from 'react-dnd'

import {Card} from '../../blocks/card'

type Props = {
    onDrop: (card: Card) => void
    children: React.ReactNode
}

const KanbanColumn = React.memo((props: Props) => {
    const [{isOver}, drop] = useDrop(() => ({
        accept: 'card',
        collect: (monitor) => ({
            isOver: monitor.isOver({shallow: true}),
        }),
        drop: (item: Card, monitor) => {
            if (monitor.isOver({shallow: true})) {
                props.onDrop(item)
            }
        },
    }))

    let className = 'octo-board-column'
    if (isOver) {
        className += ' dragover'
    }
    return (
        <div
            ref={drop}
            className={className}
        >
            {props.children}
        </div>
    )
})

export default KanbanColumn
