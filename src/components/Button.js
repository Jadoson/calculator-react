import './Button.css'

function Button({ className, onClick, value }) {
  return (
    <button className={className} onClick={onClick}>
      {value}
    </button>
  )
}

export default Button
