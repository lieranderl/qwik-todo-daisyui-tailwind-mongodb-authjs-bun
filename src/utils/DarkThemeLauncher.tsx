export const DarkThemeLauncher = () => (
    <script
      dangerouslySetInnerHTML={`if(localStorage.theme==="dark"){document.documentElement.setAttribute("data-theme",localStorage.getItem("theme"));}else if(typeof localStorage.theme==="undefined"){if(window.matchMedia("(prefers-color-scheme: dark)").matches){document.documentElement.setAttribute("data-theme",localStorage.getItem("theme"));}}`}
    />
  );