export const getOptions = (copyUrlToClipboard, resetUrl, deleteUrl, toto) => [
        {text: 'Copy Link',icon: 'fa-solid fa-copy', onClick: copyUrlToClipboard},
        {text: 'Edit Link', icon: 'fa-solid fa-pen-to-square', onClick: toto},
        {text: 'Stats', icon: 'fa-solid fa-chart-simple'},
        {text: 'Reset Stats', icon: 'fa-solid fa-rotate-left', onClick: resetUrl},
        {text: 'Delete Link', icon: 'fa-solid fa-trash', onClick: deleteUrl}
    ] 