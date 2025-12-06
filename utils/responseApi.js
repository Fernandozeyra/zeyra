
const response = {
	success: (res, data) => {
		return res.status(200).json({
			success: true,
			timestamp: new Date().toISOString(),
			data: data
		});
	},
	badRequest: (res, message) => {
		return res.status(400).json({
			success: false,
			timestamp: new Date().toISOString(),
			message: message
		});
	},
	unauthorized: (res, message) => {
		return res.status(401).json({
			success: false,
			timestamp: new Date().toISOString(),
			message: message
		});
	},
}

export { response };