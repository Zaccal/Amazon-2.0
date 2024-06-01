export const cutText = (symbols: number, text: string): string => {
	const texted = text.split(' ').slice(0, symbols).join(' ')

	return texted + '...'
}
