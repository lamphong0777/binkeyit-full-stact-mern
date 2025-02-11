export const validURLConvert = (name) => {
    return name?.toString()
        .replaceAll(" ", "-")
        .replaceAll(",", "-")
        .replaceAll("&", "-");
}