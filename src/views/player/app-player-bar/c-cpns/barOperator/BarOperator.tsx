// /views/player-bar/components/BarOperator.tsx
import React from 'react'

interface BarOperatorProps {
  playMode: number
  playList: any[]
  handleChangePlayMode: () => void
}

const BarOperator: React.FC<BarOperatorProps> = ({
  playMode,
  playList,
  handleChangePlayMode
}) => {
  return (
    <div className="bar-operator">
      <div className="left">
        <button className="btn pip" />
        <button className="sprite_playbar btn favor" />
        <button className="sprite_playbar btn share" />
      </div>
      <div className="right sprite_playbar">
        <button className="sprite_playbar btn volume" />
        <button
          className="sprite_playbar btn loop"
          onClick={handleChangePlayMode}
        />
        <button className="sprite_playbar btn playlist">
          {playList.length}
        </button>
      </div>
    </div>
  )
}

export default BarOperator
