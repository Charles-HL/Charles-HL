// Script injecté pour éviter le flash de thème (FOUC - Flash of Unstyled Content)
export function ThemeScript() {
  const themeScript = `
    (function() {
      try {
        const theme = localStorage.getItem('theme');
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        const finalTheme = theme || systemTheme;
        
        if (finalTheme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      } catch (e) {}
    })();
  `;

  return <script dangerouslySetInnerHTML={{ __html: themeScript }} />;
}
