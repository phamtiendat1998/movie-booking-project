import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#ffff66',
            main: '#eaec2a',
            dark: '#b4ba00',
            contrastText: '#000000',
        },
        secondary: {
            light: '#5e6265',
            main: '#34383b',
            dark: '#0d1215',
            contrastText: '#ffffff',
        },
    },
});