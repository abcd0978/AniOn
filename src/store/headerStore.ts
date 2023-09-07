import { atom } from 'jotai';
function process(path: string) {
  switch (path) {
    case '/': {
      return path;
    }
    case '/recommend': {
      return path;
    }
    case '/shop': {
      return path;
    }
    case '/board': {
      return path;
    }
    case '/worldcup': {
      return path;
    }
    default: {
      return '';
    }
  }
}
export const activeMenu = atom<string>(process(window.location.pathname)); // "/"
