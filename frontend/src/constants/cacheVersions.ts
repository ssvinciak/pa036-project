export const redisOn_efOn = 4;

export const redisOn_efOff = 3;

export const redisOff_efOn = 2;

export const redisOff_efOff = 1;

export const cacheOptions = [
    {
        value: '4',
        label: 'Redis on, EF on',
    },
    {
        value: '3',
        label: 'Redis on, EF off',
    },
    {
        value: '2',
        label: 'Redis off, EF on',
    },
    {
        value: '1',
        label: 'Redis off, EF off',
    },
];

// export const cacheOptions = [
//     {
//       value: {
//         ef: true,
//         redis: true,
//       },
//       label: 'Redis on, EF on'
//     },
//     {
//       value: {
//         ef: false,
//         redis: true,
//       },
//       label: 'Redis on, EF off'
//     },
//     {
//       value: {
//         ef: true,
//         redis: false,
//       },
//       label: 'Redis off, EF on',
//     },
//     {
//       value: {
//         ef: false,
//         redis: false,
//       },
//       label: 'Redis off, EF off',
//     },
//   ];
