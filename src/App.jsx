import './App.css'
import LanguageSwitcher from "./components/LanguageSwitcher.jsx";
import {useTranslation} from "react-i18next";

function App() {
    const { t, i18n } = useTranslation();

  return (
    <>
        <div className="p-4">
            <LanguageSwitcher />
            <h1>{i18n.language}</h1>
            <h1>{t('success')}</h1>
            <p>{t('welcome')}</p>
        </div>
    </>
  )
}

export default App
