import React from "react";

interface IProps {
  iconName:
    | "home"
    | "profile"
    | "settings"
    | "groups"
    | "menu"
    | "plus"
    | "square"
    | "trash"
    | "exit"
    | "minus"
    | "app";
  className?: string;
  onClick?: (e: any) => void | Promise<void>;
}

export default function Icon({ iconName, className, onClick }: IProps) {
  return (
    <>
      {iconName == "home" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className={className}
          onClick={onClick}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
          />
        </svg>
      ) : iconName == "profile" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className={className}
          onClick={onClick}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
        </svg>
      ) : iconName == "settings" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className={className}
          onClick={onClick}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
        </svg>
      ) : iconName == "groups" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className={className}
          onClick={onClick}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
          />
        </svg>
      ) : iconName == "menu" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className={className}
          onClick={onClick}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      ) : iconName == "plus" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className={className}
          onClick={onClick}
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-11.25a.75.75 0 0 0-1.5 0v2.5h-2.5a.75.75 0 0 0 0 1.5h2.5v2.5a.75.75 0 0 0 1.5 0v-2.5h2.5a.75.75 0 0 0 0-1.5h-2.5v-2.5Z"
            clipRule="evenodd"
          />
        </svg>
      ) : iconName == "square" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className={className}
          onClick={onClick}
        >
          <path d="M5.25 3A2.25 2.25 0 0 0 3 5.25v9.5A2.25 2.25 0 0 0 5.25 17h9.5A2.25 2.25 0 0 0 17 14.75v-9.5A2.25 2.25 0 0 0 14.75 3h-9.5Z" />
        </svg>
      ) : iconName == "trash" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className={className}
          onClick={onClick}
        >
          <path
            fillRule="evenodd"
            d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z"
            clip-rule="evenodd"
          />
        </svg>
      ) : iconName == "exit" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className={className}
          onClick={onClick}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
          />
        </svg>
      ) : iconName == "minus" ? (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          onClick={onClick}
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path
              d="M15 12H9"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            ></path>
            <path
              d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            ></path>
          </g>
        </svg>
      ) : iconName == "app" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          onClick={onClick}
          height="40px"
          width="40px"
        >
          <image
            x="0px"
            y="0px"
            width="40px"
            height="40px"
            href="data:img/png;base64,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"
          />
        </svg>
      ) : null}
    </>
  );
}
