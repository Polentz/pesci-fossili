import { animate, stagger } from 'motion';

animate(
    'section.cover',
    {
        opacity: [0, 1],
    },
    { duration: 1 },
);

animate(
    ".grid-menu div",
    {
        y: [-100, 0],
        opacity: [0, 1],
    },
    { duration: 1, delay: 0.5, delay: stagger(0.5) },
);

