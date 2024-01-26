const parseResponse = async (response) => {
	const { status } = response;
	let data;
	
	if (status == 400 || status == 401) {
		localStorage.removeItem('token');
		alert("유효하지 않은 로그인 정보입니다 다시 로그인해 주십시오")
		window.location.href = `http://127.0.0.1:3000`;
	} else if (status == 404) {
		localStorage.removeItem('token');
		alert("잘못된 접근입니다 다시 로그인해 주십시오")
		window.location.href = `http://127.0.0.1:3000`;
	} else if (status !== 204) {
		data = await response.json();
	}

	return {
		status,
		data,
	};
};

const request = async (params) => {
	const { method = 'GET', url, headers = {}, body } = params;

	const config = {
		method,
		headers: new window.Headers(headers),
	};


	if (headers['Accept']) {
		if (headers['Accept'] === 'application/json') config.body = body;

		// 여기서 문제 발생 -> img 파일을 보낼때 멀티파트 폼데이터를 써야하고 그때 헤더에 content-type을 multipart/form-data로 설정해야함 -> 근데 에러나는데 알아서 처리해준대요 -> 그래서 그냥 헤더에 content-type을 설정 안해줬음 
		// 멀티파트 폼데이터를 쓸떄는 body를 json.stringify를 하면 안됨 -> 그냥 body에 넣어주면 됨 근데 그거에 대한 조건을 뭘로 해야하는지 모르겠음 그래서 일단 헤더에서 accept === 'application/json'이라고 쓰긴했는데 이거 쓰는 다른 api에서 오류생길듯
		console.log(config.body);
	}
	else  {
		console.log("this");
		config.body = JSON.stringify(body);
	}
	const response = await window.fetch(url, config);

	return parseResponse(response);
};

const get = async (url, headers) => {
	const response = await request({
		url,
		headers,
		method: 'GET',
		mode: 'no-cors',
	});

	return response.data;
};

const post = async (url, body, headers) => {
	const response = await request({
		url,
		headers,
		method: 'POST',
		body,
	});
	console.log(response)
	return response.data;
};

const put = async (url, body, headers) => {
	const response = await request({
		url,
		headers,
		method: 'PUT',
		body,
	});
	return response.data;
};

const patch = async (url, body, headers) => {
	const response = await request({
		url,
		headers,
		method: 'PATCH',
		body,
	});
	return response.data;
};

const deleteRequest = async (url, headers) => {
	const response = await request({
		url,
		headers,
		method: 'DELETE',
	});
	return response.data;
};

export default {
	get,
	post,
	put,
	patch,
	delete: deleteRequest,
};
