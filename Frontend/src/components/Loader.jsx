const Loader = ({message = "loding movie..."}) => {
  return (
    <div className="state-card">
        <div className="loader"/>
        <p>{message}</p>
    </div>
  )
}

export default Loader