import css from "./inpDiv.module.css";

function InpDiv({tab,name,type,handleUserInfo}){
    return (
      <>
        <div className={`${css.inpDiv}`}>
          <label className={`${css.inpLabel}`} htmlFor={name}>{`${
            name == "Username" && tab ? "Username/Email:" : name
          }`}</label>
          <input
            required
            className={`${css.inp}`}
            type={type}
            id={name}
            name={name}
            onChange={handleUserInfo}
            placeholder={`Enter ${
              name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
            }`}
          />
        </div>
      </>
    );
}

export default InpDiv;