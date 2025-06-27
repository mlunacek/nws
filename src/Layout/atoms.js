import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export const showHeaderAtom = atom(false);
export const showAppBarAtom = atom(true);
export const showFooterAtom = atom(true);
export const drawerOpenAtom = atomWithStorage('drawer', true);
export const appBarTitleAtom = atom(null);
export const appBarLinkAtom = atom(null);

export const appBarRightAtom = atom(null);
export const appBarRightLinkAtom = atom(null);

export const appTitleAtom = atom('Working');
