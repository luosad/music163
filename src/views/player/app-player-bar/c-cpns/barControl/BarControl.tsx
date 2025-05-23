// /views/player-bar/components/BarControl.tsx
import React from 'react'

interface BarControlProps {
  isPlaying: boolean
  playMusic: () => void
  handleChangeMusic: (next: boolean) => void
}

const BarControl: React.FC<BarControlProps> = ({
  isPlaying,
  playMusic,
  handleChangeMusic
}) => {
  return (
    <div className="bar-control">
      <button
        className="btn sprite_playbar prev"
        onClick={() => handleChangeMusic(false)}
      />
      <button className="btn sprite_playbar play" onClick={playMusic} />
      <button
        className="btn sprite_playbar next"
        onClick={() => handleChangeMusic(true)}
      />
    </div>
  )
}

export default BarControl
