export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);

    const formattedDate = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    }).format(date);

    return formattedDate;
};
