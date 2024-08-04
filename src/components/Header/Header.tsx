import { useTheme } from '../../hooks/useTheme';

export default function Header() {
  const [theme, toggleTheme] = useTheme();
  const cls: string = theme ? 'dark' : 'light';

  return (
    <header className={cls}>
      <div className="switcher">
        <label className="switcher__label">
          <input
            onChange={toggleTheme}
            className="switcher__input"
            type="checkbox"
            aria-label="Toggle theme"
            name="theme"
          />
          <span className="switcher__icon-sun switcher__icon flex-center">
            <svg
              width="14"
              height="15"
              viewBox="0 0 14 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.32258 2.23665V1.33343C6.32258 1.15376 6.39395 0.981458 6.52099 0.854417C6.64803 0.727377 6.82034 0.656006 7 0.656006C7.17966 0.656006 7.35197 0.727377 7.47901 0.854417C7.60605 0.981458 7.67742 1.15376 7.67742 1.33343V2.23665C7.67742 2.41631 7.60605 2.58862 7.47901 2.71566C7.35197 2.8427 7.17966 2.91407 7 2.91407C6.82034 2.91407 6.64803 2.8427 6.52099 2.71566C6.39395 2.58862 6.32258 2.41631 6.32258 2.23665ZM10.8387 7.65601C10.8387 8.41523 10.6136 9.15741 10.1918 9.78868C9.76997 10.42 9.17044 10.912 8.46901 11.2025C7.76758 11.4931 6.99574 11.5691 6.2511 11.421C5.50647 11.2728 4.82248 10.9072 4.28562 10.3704C3.74877 9.83353 3.38317 9.14954 3.23505 8.4049C3.08693 7.66026 3.16295 6.88843 3.45349 6.187C3.74404 5.48556 4.23605 4.88604 4.86733 4.46424C5.4986 4.04243 6.24077 3.8173 7 3.8173C8.01777 3.81834 8.99355 4.22311 9.71322 4.94278C10.4329 5.66245 10.8377 6.63824 10.8387 7.65601ZM9.48387 7.65601C9.48387 7.16474 9.33819 6.68451 9.06526 6.27604C8.79233 5.86757 8.4044 5.54921 7.95054 5.36121C7.49667 5.17321 6.99724 5.12402 6.51542 5.21986C6.0336 5.3157 5.59101 5.55227 5.24364 5.89964C4.89626 6.24702 4.6597 6.6896 4.56386 7.17143C4.46802 7.65325 4.5172 8.15267 4.7052 8.60654C4.8932 9.06041 5.21156 9.44834 5.62004 9.72127C6.02851 9.9942 6.50874 10.1399 7 10.1399C7.65853 10.1391 8.28988 9.8772 8.75554 9.41154C9.22119 8.94589 9.48312 8.31454 9.48387 7.65601ZM2.68202 4.29657C2.74503 4.35958 2.81984 4.40957 2.90217 4.44367C2.9845 4.47777 3.07274 4.49533 3.16185 4.49533C3.25097 4.49533 3.33921 4.47777 3.42154 4.44367C3.50387 4.40957 3.57868 4.35958 3.64169 4.29657C3.70471 4.23356 3.75469 4.15875 3.78879 4.07642C3.8229 3.99409 3.84045 3.90585 3.84045 3.81673C3.84045 3.72762 3.8229 3.63938 3.78879 3.55704C3.75469 3.47471 3.70471 3.39991 3.64169 3.33689L2.96427 2.65947C2.83701 2.53221 2.66441 2.46072 2.48444 2.46072C2.30446 2.46072 2.13186 2.53221 2.0046 2.65947C1.87734 2.78673 1.80584 2.95934 1.80584 3.13931C1.80584 3.31929 1.87734 3.49189 2.0046 3.61915L2.68202 4.29657ZM2.68202 11.0143L2.0046 11.6917C1.94158 11.7547 1.8916 11.8296 1.8575 11.9119C1.82339 11.9942 1.80584 12.0825 1.80584 12.1716C1.80584 12.2607 1.82339 12.3489 1.8575 12.4313C1.8916 12.5136 1.94158 12.5884 2.0046 12.6514C2.13186 12.7787 2.30446 12.8502 2.48444 12.8502C2.57355 12.8502 2.66179 12.8326 2.74412 12.7985C2.82645 12.7644 2.90126 12.7144 2.96427 12.6514L3.64169 11.974C3.76895 11.8467 3.84045 11.6741 3.84045 11.4942C3.84045 11.3142 3.76895 11.1416 3.64169 11.0143C3.51443 10.8871 3.34183 10.8156 3.16185 10.8156C2.98188 10.8156 2.80928 10.8871 2.68202 11.0143ZM10.8387 4.49472C10.9277 4.49479 11.0158 4.47732 11.0981 4.44332C11.1803 4.40933 11.255 4.35946 11.318 4.29657L11.9954 3.61915C12.0584 3.55614 12.1084 3.48133 12.1425 3.399C12.1766 3.31667 12.1942 3.22843 12.1942 3.13931C12.1942 3.0502 12.1766 2.96196 12.1425 2.87963C12.1084 2.79729 12.0584 2.72249 11.9954 2.65947C11.9324 2.59646 11.8576 2.54648 11.7753 2.51237C11.6929 2.47827 11.6047 2.46072 11.5156 2.46072C11.4264 2.46072 11.3382 2.47827 11.2559 2.51237C11.1735 2.54648 11.0987 2.59646 11.0357 2.65947L10.3583 3.33689C10.263 3.43164 10.198 3.5526 10.1717 3.68437C10.1453 3.81615 10.1587 3.95279 10.2102 4.07692C10.2617 4.20104 10.349 4.30705 10.4609 4.38145C10.5728 4.45584 10.7043 4.49527 10.8387 4.49472ZM11.318 11.0154C11.1907 10.8882 11.0181 10.8167 10.8381 10.8167C10.6582 10.8167 10.4856 10.8882 10.3583 11.0154C10.231 11.1427 10.1595 11.3153 10.1595 11.4953C10.1595 11.6753 10.231 11.8479 10.3583 11.9751L11.0357 12.6525C11.163 12.7798 11.3356 12.8513 11.5156 12.8513C11.6955 12.8513 11.8681 12.7798 11.9954 12.6525C12.1227 12.5253 12.1942 12.3527 12.1942 12.1727C12.1942 11.9927 12.1227 11.8201 11.9954 11.6929L11.318 11.0154ZM2.25806 7.65601C2.25806 7.47634 2.18669 7.30404 2.05965 7.177C1.93261 7.04996 1.76031 6.97859 1.58065 6.97859H0.677419C0.497757 6.97859 0.325452 7.04996 0.198412 7.177C0.0713708 7.30404 0 7.47634 0 7.65601C0 7.83567 0.0713708 8.00797 0.198412 8.13501C0.325452 8.26205 0.497757 8.33343 0.677419 8.33343H1.58065C1.76031 8.33343 1.93261 8.26205 2.05965 8.13501C2.18669 8.00797 2.25806 7.83567 2.25806 7.65601ZM7 12.3979C6.82034 12.3979 6.64803 12.4693 6.52099 12.5964C6.39395 12.7234 6.32258 12.8957 6.32258 13.0754V13.9786C6.32258 14.1582 6.39395 14.3306 6.52099 14.4576C6.64803 14.5846 6.82034 14.656 7 14.656C7.17966 14.656 7.35197 14.5846 7.47901 14.4576C7.60605 14.3306 7.67742 14.1582 7.67742 13.9786V13.0754C7.67742 12.8957 7.60605 12.7234 7.47901 12.5964C7.35197 12.4693 7.17966 12.3979 7 12.3979ZM13.3226 6.97859H12.4194C12.2397 6.97859 12.0674 7.04996 11.9403 7.177C11.8133 7.30404 11.7419 7.47634 11.7419 7.65601C11.7419 7.83567 11.8133 8.00797 11.9403 8.13501C12.0674 8.26205 12.2397 8.33343 12.4194 8.33343H13.3226C13.5022 8.33343 13.6745 8.26205 13.8016 8.13501C13.9286 8.00797 14 7.83567 14 7.65601C14 7.47634 13.9286 7.30404 13.8016 7.177C13.6745 7.04996 13.5022 6.97859 13.3226 6.97859Z"
                fill="currentColor"
              />
            </svg>
          </span>
          <span className="switcher__icon-moon switcher__icon flex-center">
            <svg
              width="11"
              height="12"
              viewBox="0 0 11 12"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.9782 7.67381C10.6297 8.81156 9.93141 9.81041 8.98256 10.5282C8.1495 11.1553 7.15817 11.5378 6.11986 11.6327C5.08154 11.7276 4.03733 11.5312 3.10442 11.0655C2.17152 10.5998 1.38685 9.8832 0.838486 8.99621C0.290124 8.10922 -0.000226109 7.08691 2.63972e-05 6.04404C-0.00372236 4.82678 0.391905 3.64191 1.12621 2.6712C1.84386 1.72214 2.84248 1.02365 3.97998 0.675117C4.05495 0.652027 4.13479 0.649816 4.21092 0.668722C4.28706 0.687627 4.3566 0.726934 4.41207 0.782414C4.46753 0.837895 4.50683 0.90745 4.52573 0.983599C4.54463 1.05975 4.54242 1.13961 4.51934 1.2146C4.27061 2.03754 4.24975 2.91256 4.459 3.74642C4.66824 4.58028 5.09974 5.34174 5.70753 5.94966C6.31531 6.55757 7.0766 6.98917 7.91027 7.19846C8.74395 7.40775 9.61877 7.38689 10.4415 7.13811C10.5165 7.11502 10.5963 7.1128 10.6725 7.13171C10.7486 7.15062 10.8182 7.18992 10.8736 7.2454C10.9291 7.30088 10.9684 7.37044 10.9873 7.44659C11.0062 7.52274 11.004 7.6026 10.9809 7.67759L10.9782 7.67381Z"
                fill="currentColor"
              />
            </svg>
          </span>
          <span className="switcher__bg"></span>
        </label>
      </div>
    </header>
  );
}
