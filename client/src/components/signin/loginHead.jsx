import css from "./loginHead.module.css";

function LoginHead({handleTab,tab}){
    return<>
    <div className={`${css.loginLabel}`}>
      <button className={`${css.loginSpan} ${tab? `${css.activeSpan}`:""}`}  onClick={handleTab}>Login</button>
      <button className={`${css.loginSpan} ${!tab? `${css.activeSpan}`:""}`} onClick={handleTab}>Sign in</button>
    </div>
    </>
}

export default LoginHead;