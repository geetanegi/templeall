export const toTitleCase = (str: string): string => {
    return str
        ? str
              .replace(/([a-z])([A-Z])/gu, '$1 $2')
              .replace(/([A-Z]+)([A-Z][a-z])/gu, '$1 $2')
              .replace(/^./u, (item) => item.toUpperCase())
        : '';
};
