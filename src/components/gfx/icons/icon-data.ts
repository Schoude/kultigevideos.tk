export interface Icon {
  name: string;
  viewBox: string;
  d: string;
}

export enum ICON_SIZE {
  xxs = 'xxs',
  xs = 'xs',
  s = 's',
  m = 'm',
  l = 'l',
  xl = 'xl',
}

export const icons: Icon[] = [
  {
    name: 'house-user',
    viewBox: '0 0 576 512',
    d: 'M570.69,236.27,512,184.44V48a16,16,0,0,0-16-16H432a16,16,0,0,0-16,16V99.67L314.78,10.3C308.5,4.61,296.53,0,288,0s-20.46,4.61-26.74,10.3l-256,226A18.27,18.27,0,0,0,0,248.2a18.64,18.64,0,0,0,4.09,10.71L25.5,282.7a21.14,21.14,0,0,0,12,5.3,21.67,21.67,0,0,0,10.69-4.11l15.9-14V480a32,32,0,0,0,32,32H480a32,32,0,0,0,32-32V269.88l15.91,14A21.94,21.94,0,0,0,538.63,288a20.89,20.89,0,0,0,11.87-5.31l21.41-23.81A21.64,21.64,0,0,0,576,248.19,21,21,0,0,0,570.69,236.27ZM288,176a64,64,0,1,1-64,64A64,64,0,0,1,288,176ZM400,448H176a16,16,0,0,1-16-16,96,96,0,0,1,96-96h64a96,96,0,0,1,96,96A16,16,0,0,1,400,448Z',
  },
  {
    name: 'university',
    viewBox: '0 0 512 512',
    d: 'M496 128v16a8 8 0 0 1-8 8h-24v12c0 6.627-5.373 12-12 12H60c-6.627 0-12-5.373-12-12v-12H24a8 8 0 0 1-8-8v-16a8 8 0 0 1 4.941-7.392l232-88a7.996 7.996 0 0 1 6.118 0l232 88A8 8 0 0 1 496 128zm-24 304H40c-13.255 0-24 10.745-24 24v16a8 8 0 0 0 8 8h464a8 8 0 0 0 8-8v-16c0-13.255-10.745-24-24-24zM96 192v192H60c-6.627 0-12 5.373-12 12v20h416v-20c0-6.627-5.373-12-12-12h-36V192h-64v192h-64V192h-64v192h-64V192H96z',
  },
  {
    name: 'laptop-code',
    viewBox: '0 0 640 512',
    d: 'M255.03 261.65c6.25 6.25 16.38 6.25 22.63 0l11.31-11.31c6.25-6.25 6.25-16.38 0-22.63L253.25 192l35.71-35.72c6.25-6.25 6.25-16.38 0-22.63l-11.31-11.31c-6.25-6.25-16.38-6.25-22.63 0l-58.34 58.34c-6.25 6.25-6.25 16.38 0 22.63l58.35 58.34zm96.01-11.3l11.31 11.31c6.25 6.25 16.38 6.25 22.63 0l58.34-58.34c6.25-6.25 6.25-16.38 0-22.63l-58.34-58.34c-6.25-6.25-16.38-6.25-22.63 0l-11.31 11.31c-6.25 6.25-6.25 16.38 0 22.63L386.75 192l-35.71 35.72c-6.25 6.25-6.25 16.38 0 22.63zM624 416H381.54c-.74 19.81-14.71 32-32.74 32H288c-18.69 0-33.02-17.47-32.77-32H16c-8.8 0-16 7.2-16 16v16c0 35.2 28.8 64 64 64h512c35.2 0 64-28.8 64-64v-16c0-8.8-7.2-16-16-16zM576 48c0-26.4-21.6-48-48-48H112C85.6 0 64 21.6 64 48v336h512V48zm-64 272H128V64h384v256z',
  },
  {
    name: 'comment-alt',
    viewBox: '0 0 512 512',
    d: 'M448 0H64C28.7 0 0 28.7 0 64v288c0 35.3 28.7 64 64 64h96v84c0 7.1 5.8 12 12 12 2.4 0 4.9-.7 7.1-2.4L304 416h144c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64zm16 352c0 8.8-7.2 16-16 16H288l-12.8 9.6L208 428v-60H64c-8.8 0-16-7.2-16-16V64c0-8.8 7.2-16 16-16h384c8.8 0 16 7.2 16 16v288z',
  },
  {
    name: 'chevron-right',
    viewBox: '0 0 256 512',
    d: 'M17.525 36.465l-7.071 7.07c-4.686 4.686-4.686 12.284 0 16.971L205.947 256 10.454 451.494c-4.686 4.686-4.686 12.284 0 16.971l7.071 7.07c4.686 4.686 12.284 4.686 16.97 0l211.051-211.05c4.686-4.686 4.686-12.284 0-16.971L34.495 36.465c-4.686-4.687-12.284-4.687-16.97 0z',
  },
  {
    name: 'chevron-left',
    viewBox: '0 0 256 512',
    d: 'M238.475 475.535l7.071-7.07c4.686-4.686 4.686-12.284 0-16.971L50.053 256 245.546 60.506c4.686-4.686 4.686-12.284 0-16.971l-7.071-7.07c-4.686-4.686-12.284-4.686-16.97 0L10.454 247.515c-4.686 4.686-4.686 12.284 0 16.971l211.051 211.05c4.686 4.686 12.284 4.686 16.97-.001z',
  },
  {
    name: 'chevron-down',
    viewBox: '0 0 448 512',
    d: 'M443.5 162.6l-7.1-7.1c-4.7-4.7-12.3-4.7-17 0L224 351 28.5 155.5c-4.7-4.7-12.3-4.7-17 0l-7.1 7.1c-4.7 4.7-4.7 12.3 0 17l211 211.1c4.7 4.7 12.3 4.7 17 0l211-211.1c4.8-4.7 4.8-12.3.1-17z',
  },
  {
    name: 'sign-in',
    viewBox: '0 0 512 512',
    d: 'M184 83.5l164.5 164c4.7 4.7 4.7 12.3 0 17L184 428.5c-4.7 4.7-12.3 4.7-17 0l-7.1-7.1c-4.7-4.7-4.7-12.3 0-17l132-131.4H12c-6.6 0-12-5.4-12-12v-10c0-6.6 5.4-12 12-12h279.9L160 107.6c-4.7-4.7-4.7-12.3 0-17l7.1-7.1c4.6-4.7 12.2-4.7 16.9 0zM512 400V112c0-26.5-21.5-48-48-48H332c-6.6 0-12 5.4-12 12v8c0 6.6 5.4 12 12 12h132c8.8 0 16 7.2 16 16v288c0 8.8-7.2 16-16 16H332c-6.6 0-12 5.4-12 12v8c0 6.6 5.4 12 12 12h132c26.5 0 48-21.5 48-48z',
  },
  {
    name: 'sign-out',
    viewBox: '0 0 512 512',
    d: 'M48 64h132c6.6 0 12 5.4 12 12v8c0 6.6-5.4 12-12 12H48c-8.8 0-16 7.2-16 16v288c0 8.8 7.2 16 16 16h132c6.6 0 12 5.4 12 12v8c0 6.6-5.4 12-12 12H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48zm279 19.5l-7.1 7.1c-4.7 4.7-4.7 12.3 0 17l132 131.4H172c-6.6 0-12 5.4-12 12v10c0 6.6 5.4 12 12 12h279.9L320 404.4c-4.7 4.7-4.7 12.3 0 17l7.1 7.1c4.7 4.7 12.3 4.7 17 0l164.5-164c4.7-4.7 4.7-12.3 0-17L344 83.5c-4.7-4.7-12.3-4.7-17 0z',
  },
  {
    name: 'user-circle',
    viewBox: '0 0 496 512',
    d: 'M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm128 421.6c-35.9 26.5-80.1 42.4-128 42.4s-92.1-15.9-128-42.4V416c0-35.3 28.7-64 64-64 11.1 0 27.5 11.4 64 11.4 36.6 0 52.8-11.4 64-11.4 35.3 0 64 28.7 64 64v13.6zm30.6-27.5c-6.8-46.4-46.3-82.1-94.6-82.1-20.5 0-30.4 11.4-64 11.4S204.6 320 184 320c-48.3 0-87.8 35.7-94.6 82.1C53.9 363.6 32 312.4 32 256c0-119.1 96.9-216 216-216s216 96.9 216 216c0 56.4-21.9 107.6-57.4 146.1zM248 120c-48.6 0-88 39.4-88 88s39.4 88 88 88 88-39.4 88-88-39.4-88-88-88zm0 144c-30.9 0-56-25.1-56-56s25.1-56 56-56 56 25.1 56 56-25.1 56-56 56z',
  },
  {
    name: 'sync-alt',
    viewBox: '0 0 512 512',
    d: 'M483.515 28.485L431.35 80.65C386.475 35.767 324.485 8 256 8 123.228 8 14.824 112.338 8.31 243.493 7.971 250.311 13.475 256 20.301 256h28.045c6.353 0 11.613-4.952 11.973-11.294C66.161 141.649 151.453 60 256 60c54.163 0 103.157 21.923 138.614 57.386l-54.128 54.129c-7.56 7.56-2.206 20.485 8.485 20.485H492c6.627 0 12-5.373 12-12V36.971c0-10.691-12.926-16.045-20.485-8.486zM491.699 256h-28.045c-6.353 0-11.613 4.952-11.973 11.294C445.839 370.351 360.547 452 256 452c-54.163 0-103.157-21.923-138.614-57.386l54.128-54.129c7.56-7.56 2.206-20.485-8.485-20.485H20c-6.627 0-12 5.373-12 12v143.029c0 10.691 12.926 16.045 20.485 8.485L80.65 431.35C125.525 476.233 187.516 504 256 504c132.773 0 241.176-104.338 247.69-235.493.339-6.818-5.165-12.507-11.991-12.507z',
  },
  {
    name: 'ban',
    viewBox: '0 0 512 512',
    d: 'M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zM103.265 408.735c-80.622-80.622-84.149-208.957-10.9-293.743l304.644 304.643c-84.804 73.264-213.138 69.706-293.744-10.9zm316.37-11.727L114.992 92.365c84.804-73.263 213.137-69.705 293.743 10.9 80.622 80.621 84.149 208.957 10.9 293.743z',
  },
  {
    name: 'lock-open',
    viewBox: '0 0 640 512',
    d: 'M480.5 0C392-.3 320 71.6 320 160v64H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48h-48v-62.6c0-70.7 56.7-129 127.3-129.4C550.2 31.6 608 89.2 608 160v84c0 6.6 5.4 12 12 12h8c6.6 0 12-5.4 12-12v-82.5C640 73.1 568.9.3 480.5 0zM400 256c8.8 0 16 7.2 16 16v192c0 8.8-7.2 16-16 16H48c-8.8 0-16-7.2-16-16V272c0-8.8 7.2-16 16-16h352z',
  },
  {
    name: 'star-outline',
    viewBox: '0 0 576 512',
    d: 'M528.1 171.5L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6zM405.8 317.9l27.8 162L288 403.5 142.5 480l27.8-162L52.5 203.1l162.7-23.6L288 32l72.8 147.5 162.7 23.6-117.7 114.8z',
  },
  {
    name: 'star',
    viewBox: '0 0 576 512',
    d: 'M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z',
  },
  {
    name: 'times',
    viewBox: '0 0 320 512',
    d: 'M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z',
  },
  {
    name: 'info-circle',
    viewBox: '0 0 512 512',
    d: 'M256 40c118.621 0 216 96.075 216 216 0 119.291-96.61 216-216 216-119.244 0-216-96.562-216-216 0-119.203 96.602-216 216-216m0-32C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm-36 344h12V232h-12c-6.627 0-12-5.373-12-12v-8c0-6.627 5.373-12 12-12h48c6.627 0 12 5.373 12 12v140h12c6.627 0 12 5.373 12 12v8c0 6.627-5.373 12-12 12h-72c-6.627 0-12-5.373-12-12v-8c0-6.627 5.373-12 12-12zm36-240c-17.673 0-32 14.327-32 32s14.327 32 32 32 32-14.327 32-32-14.327-32-32-32z',
  },
  {
    name: 'eye',
    viewBox: '0 0 576 512',
    d: 'M288 288a64 64 0 0 0 0-128c-1 0-1.88.24-2.85.29a47.5 47.5 0 0 1-60.86 60.86c0 1-.29 1.88-.29 2.85a64 64 0 0 0 64 64zm284.52-46.6C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 96a128 128 0 1 1-128 128A128.14 128.14 0 0 1 288 96zm0 320c-107.36 0-205.46-61.31-256-160a294.78 294.78 0 0 1 129.78-129.33C140.91 153.69 128 187.17 128 224a160 160 0 0 0 320 0c0-36.83-12.91-70.31-33.78-97.33A294.78 294.78 0 0 1 544 256c-50.53 98.69-148.64 160-256 160z',
  },
  {
    name: 'eye-slash',
    viewBox: '0 0 640 512',
    d: 'M637 485.25L23 1.75A8 8 0 0 0 11.76 3l-10 12.51A8 8 0 0 0 3 26.75l614 483.5a8 8 0 0 0 11.25-1.25l10-12.51a8 8 0 0 0-1.25-11.24zM320 96a128.14 128.14 0 0 1 128 128c0 21.62-5.9 41.69-15.4 59.57l25.45 20C471.65 280.09 480 253.14 480 224c0-36.83-12.91-70.31-33.78-97.33A294.88 294.88 0 0 1 576.05 256a299.73 299.73 0 0 1-67.77 87.16l25.32 19.94c28.47-26.28 52.87-57.26 70.93-92.51a32.35 32.35 0 0 0 0-29.19C550.3 135.59 442.94 64 320 64a311.23 311.23 0 0 0-130.12 28.43l45.77 36C258.24 108.52 287.56 96 320 96zm60.86 146.83A63.15 63.15 0 0 0 320 160c-1 0-1.89.24-2.85.29a45.11 45.11 0 0 1-.24 32.19zm-217.62-49.16A154.29 154.29 0 0 0 160 224a159.39 159.39 0 0 0 226.27 145.29L356.69 346c-11.7 3.53-23.85 6-36.68 6A128.15 128.15 0 0 1 192 224c0-2.44.59-4.72.72-7.12zM320 416c-107.36 0-205.47-61.31-256-160 17.43-34 41.09-62.72 68.31-86.72l-25.86-20.37c-28.48 26.28-52.87 57.25-70.93 92.5a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448a311.25 311.25 0 0 0 130.12-28.43l-29.25-23C389.06 408.84 355.15 416 320 416z',
  },
  {
    name: 'check',
    viewBox: '0 0 448 512',
    d: 'M413.505 91.951L133.49 371.966l-98.995-98.995c-4.686-4.686-12.284-4.686-16.971 0L6.211 284.284c-4.686 4.686-4.686 12.284 0 16.971l118.794 118.794c4.686 4.686 12.284 4.686 16.971 0l299.813-299.813c4.686-4.686 4.686-12.284 0-16.971l-11.314-11.314c-4.686-4.686-12.284-4.686-16.97 0z',
  },
  {
    name: 'sparkles',
    viewBox: '0 0 512 512',
    d: 'M324.42 103.15L384 128l24.84 59.58a8 8 0 0 0 14.32 0L448 128l59.58-24.85a8 8 0 0 0 0-14.31L448 64 423.16 4.42a8 8 0 0 0-14.32 0L384 64l-59.58 24.84a8 8 0 0 0 0 14.31zm183.16 305.69L448 384l-24.84-59.58a8 8 0 0 0-14.32 0L384 384l-59.58 24.84a8 8 0 0 0 0 14.32L384 448l24.84 59.58a8 8 0 0 0 14.32 0L448 448l59.58-24.84a8 8 0 0 0 0-14.32zM384 255.64a16.06 16.06 0 0 0-8.84-14.33l-112.57-56.39-56.28-112.77c-5.44-10.87-23.19-10.87-28.62 0l-56.28 112.77L8.84 241.31a16 16 0 0 0 0 28.67l112.57 56.39 56.28 112.77a16 16 0 0 0 28.62 0l56.28-112.77L375.16 270a16.07 16.07 0 0 0 8.84-14.36z',
  },
  {
    name: 'bars',
    viewBox: '0 0 448 512',
    d: 'M442 114H6a6 6 0 0 1-6-6V84a6 6 0 0 1 6-6h436a6 6 0 0 1 6 6v24a6 6 0 0 1-6 6zm0 160H6a6 6 0 0 1-6-6v-24a6 6 0 0 1 6-6h436a6 6 0 0 1 6 6v24a6 6 0 0 1-6 6zm0 160H6a6 6 0 0 1-6-6v-24a6 6 0 0 1 6-6h436a6 6 0 0 1 6 6v24a6 6 0 0 1-6 6z',
  },
  {
    name: 'upload',
    viewBox: '0 0 512 512',
    d: 'M452 432c0 11-9 20-20 20s-20-9-20-20 9-20 20-20 20 9 20 20zm-84-20c-11 0-20 9-20 20s9 20 20 20 20-9 20-20-9-20-20-20zm144-48v104c0 24.3-19.7 44-44 44H44c-24.3 0-44-19.7-44-44V364c0-24.3 19.7-44 44-44h124v-99.3h-52.7c-35.6 0-53.4-43.1-28.3-68.3L227.7 11.7c15.6-15.6 40.9-15.6 56.6 0L425 152.4c25.2 25.2 7.3 68.3-28.3 68.3H344V320h124c24.3 0 44 19.7 44 44zM200 188.7V376c0 4.4 3.6 8 8 8h96c4.4 0 8-3.6 8-8V188.7h84.7c7.1 0 10.7-8.6 5.7-13.7L261.7 34.3c-3.1-3.1-8.2-3.1-11.3 0L109.7 175c-5 5-1.5 13.7 5.7 13.7H200zM480 364c0-6.6-5.4-12-12-12H344v24c0 22.1-17.9 40-40 40h-96c-22.1 0-40-17.9-40-40v-24H44c-6.6 0-12 5.4-12 12v104c0 6.6 5.4 12 12 12h424c6.6 0 12-5.4 12-12V364z',
  },
  {
    name: 'thumbs-up',
    viewBox: '0 0 512 512',
    d: 'M496.656 285.683C506.583 272.809 512 256 512 235.468c-.001-37.674-32.073-72.571-72.727-72.571h-70.15c8.72-17.368 20.695-38.911 20.695-69.817C389.819 34.672 366.518 0 306.91 0c-29.995 0-41.126 37.918-46.829 67.228-3.407 17.511-6.626 34.052-16.525 43.951C219.986 134.75 184 192 162.382 203.625c-2.189.922-4.986 1.648-8.032 2.223C148.577 197.484 138.931 192 128 192H32c-17.673 0-32 14.327-32 32v256c0 17.673 14.327 32 32 32h96c17.673 0 32-14.327 32-32v-8.74c32.495 0 100.687 40.747 177.455 40.726 5.505.003 37.65.03 41.013 0 59.282.014 92.255-35.887 90.335-89.793 15.127-17.727 22.539-43.337 18.225-67.105 12.456-19.526 15.126-47.07 9.628-69.405zM32 480V224h96v256H32zm424.017-203.648C472 288 472 336 450.41 347.017c13.522 22.76 1.352 53.216-15.015 61.996 8.293 52.54-18.961 70.606-57.212 70.974-3.312.03-37.247 0-40.727 0-72.929 0-134.742-40.727-177.455-40.727V235.625c37.708 0 72.305-67.939 106.183-101.818 30.545-30.545 20.363-81.454 40.727-101.817 50.909 0 50.909 35.517 50.909 61.091 0 42.189-30.545 61.09-30.545 101.817h111.999c22.73 0 40.627 20.364 40.727 40.727.099 20.363-8.001 36.375-23.984 40.727zM104 432c0 13.255-10.745 24-24 24s-24-10.745-24-24 10.745-24 24-24 24 10.745 24 24z',
  },
  {
    name: 'thumbs-down',
    viewBox: '0 0 512 512',
    d: 'M496.656 226.317c5.498-22.336 2.828-49.88-9.627-69.405 4.314-23.768-3.099-49.377-18.225-67.105C470.724 35.902 437.75 0 378.468.014c-3.363-.03-35.508-.003-41.013 0C260.593-.007 195.917 40 160 40h-10.845c-5.64-4.975-13.042-8-21.155-8H32C14.327 32 0 46.327 0 64v256c0 17.673 14.327 32 32 32h96c17.673 0 32-14.327 32-32v-12.481c.85.266 1.653.549 2.382.856C184 320 219.986 377.25 243.556 400.82c9.9 9.9 13.118 26.44 16.525 43.951C265.784 474.082 276.915 512 306.91 512c59.608 0 82.909-34.672 82.909-93.08 0-30.906-11.975-52.449-20.695-69.817h70.15c40.654 0 72.726-34.896 72.727-72.571-.001-20.532-5.418-37.341-15.345-50.215zM128 320H32V64h96v256zm311.273-2.898H327.274c0 40.727 30.545 59.628 30.545 101.817 0 25.574 0 61.091-50.909 61.091-20.363-20.364-10.182-71.272-40.727-101.817-28.607-28.607-71.272-101.818-101.818-101.818H160V72.74h4.365c34.701 0 101.818-40.727 173.09-40.727 3.48 0 37.415-.03 40.727 0 38.251.368 65.505 18.434 57.212 70.974 16.367 8.78 28.538 39.235 15.015 61.996C472 176 472 224 456.017 235.648 472 240 480.1 256.012 480 276.375c-.1 20.364-17.997 40.727-40.727 40.727zM104 272c0 13.255-10.745 24-24 24s-24-10.745-24-24 10.745-24 24-24 24 10.745 24 24z',
  },
  {
    name: 'thumbs-up-solid',
    viewBox: '0 0 512 512',
    d: 'M104 224H24c-13.255 0-24 10.745-24 24v240c0 13.255 10.745 24 24 24h80c13.255 0 24-10.745 24-24V248c0-13.255-10.745-24-24-24zM64 472c-13.255 0-24-10.745-24-24s10.745-24 24-24 24 10.745 24 24-10.745 24-24 24zM384 81.452c0 42.416-25.97 66.208-33.277 94.548h101.723c33.397 0 59.397 27.746 59.553 58.098.084 17.938-7.546 37.249-19.439 49.197l-.11.11c9.836 23.337 8.237 56.037-9.308 79.469 8.681 25.895-.069 57.704-16.382 74.757 4.298 17.598 2.244 32.575-6.148 44.632C440.202 511.587 389.616 512 346.839 512l-2.845-.001c-48.287-.017-87.806-17.598-119.56-31.725-15.957-7.099-36.821-15.887-52.651-16.178-6.54-.12-11.783-5.457-11.783-11.998v-213.77c0-3.2 1.282-6.271 3.558-8.521 39.614-39.144 56.648-80.587 89.117-113.111 14.804-14.832 20.188-37.236 25.393-58.902C282.515 39.293 291.817 0 312 0c24 0 72 8 72 81.452z',
  },
  {
    name: 'thumbs-down-solid',
    viewBox: '0 0 512 512',
    d: 'M0 56v240c0 13.255 10.745 24 24 24h80c13.255 0 24-10.745 24-24V56c0-13.255-10.745-24-24-24H24C10.745 32 0 42.745 0 56zm40 200c0-13.255 10.745-24 24-24s24 10.745 24 24-10.745 24-24 24-24-10.745-24-24zm272 256c-20.183 0-29.485-39.293-33.931-57.795-5.206-21.666-10.589-44.07-25.393-58.902-32.469-32.524-49.503-73.967-89.117-113.111a11.98 11.98 0 0 1-3.558-8.521V59.901c0-6.541 5.243-11.878 11.783-11.998 15.831-.29 36.694-9.079 52.651-16.178C256.189 17.598 295.709.017 343.995 0h2.844c42.777 0 93.363.413 113.774 29.737 8.392 12.057 10.446 27.034 6.148 44.632 16.312 17.053 25.063 48.863 16.382 74.757 17.544 23.432 19.143 56.132 9.308 79.469l.11.11c11.893 11.949 19.523 31.259 19.439 49.197-.156 30.352-26.157 58.098-59.553 58.098H350.723C358.03 364.34 384 388.132 384 430.548 384 504 336 512 312 512z',
  },
  {
    name: 'plus',
    viewBox: '0 0 384 512',
    d: 'M376 232H216V72c0-4.42-3.58-8-8-8h-32c-4.42 0-8 3.58-8 8v160H8c-4.42 0-8 3.58-8 8v32c0 4.42 3.58 8 8 8h160v160c0 4.42 3.58 8 8 8h32c4.42 0 8-3.58 8-8V280h160c4.42 0 8-3.58 8-8v-32c0-4.42-3.58-8-8-8z',
  },
  {
    name: 'user-plus',
    viewBox: '0 0 640 512',
    d: 'M632 224h-88v-88c0-4.4-3.6-8-8-8h-16c-4.4 0-8 3.6-8 8v88h-88c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h88v88c0 4.4 3.6 8 8 8h16c4.4 0 8-3.6 8-8v-88h88c4.4 0 8-3.6 8-8v-16c0-4.4-3.6-8-8-8zm-318.4 64c-28.7 0-42.5 16-89.6 16-47.1 0-60.8-16-89.6-16C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4zM416 464c0 8.8-7.2 16-16 16H48c-8.8 0-16-7.2-16-16v-41.6C32 365.9 77.9 320 134.4 320c19.6 0 39.1 16 89.6 16 50.4 0 70-16 89.6-16 56.5 0 102.4 45.9 102.4 102.4V464zM224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm0-224c52.9 0 96 43.1 96 96s-43.1 96-96 96-96-43.1-96-96 43.1-96 96-96z',
  },
  {
    name: 'ellipsis-v',
    viewBox: '0 0 128 512',
    d: 'M64 208c26.5 0 48 21.5 48 48s-21.5 48-48 48-48-21.5-48-48 21.5-48 48-48zM16 104c0 26.5 21.5 48 48 48s48-21.5 48-48-21.5-48-48-48-48 21.5-48 48zm0 304c0 26.5 21.5 48 48 48s48-21.5 48-48-21.5-48-48-48-48 21.5-48 48z',
  },
];
