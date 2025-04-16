import { NavLink } from 'react-router-dom';


function LoginRegisterLayout({ handleSubmit, handleChange, errorMessage, label, bottomText, linkText}) {

  return (
    <div className="max-w-lg mx-auto mt-14 p-6 bg-[#1B1A46] text-white rounded-lg shadow-md">
      <h2 className="text-xl mb-4 text-center font-bold p-2 block tracking-widest w-fit whitespace-nowrap bg-[#34335A]">{label}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          className="w-full p-2 rounded bg-[#010031] border border-[#1B1A46]"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full p-2 rounded bg-[#010031] border border-[#1B1A46]"
          required
        />
        <button
          type="submit"
          className="w-full bg-emerald-500 hover:bg-emerald-600 
                      text-lg text-white font-bold
                      py-2 px-8
                      rounded-lg 
                      shadow-md hover:shadow-lg 
                      transition-all duration-200 
                      transform hover:scale-105 disabled:transform-none
                      focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-opacity-75
                      active:scale-95 disabled:active:scale-100
                      cursor-pointer disabled:cursor-not-allowed"
        >
          {label}
        </button>
      </form>

      <p className="mt-4 text-md">
        {bottomText}{' '}
        <NavLink to="/register" className="text-blue-400 underline">
          {linkText}
        </NavLink>
      </p>

      {errorMessage && <div className="mt-4 text-yellow-400">{errorMessage}</div>}
    </div>
  );
}

export default LoginRegisterLayout;