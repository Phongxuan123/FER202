import React, { useState } from 'react';
import { Container, Card, Button, Row, Col, Alert } from 'react-bootstrap';

const ErrorTestPage = () => {
  const [testResult, setTestResult] = useState(null);

  const testNetworkError = () => {
    setTestResult({ type: 'testing', message: 'Testing network error...' });
    
    // Attempt to fetch from invalid URL to simulate network error
    fetch('https://invalid-url-that-does-not-exist-12345.com/api')
      .then(res => res.json())
      .catch(err => {
        setTestResult({ 
          type: 'error', 
          title: 'Lỗi Mạng Được Bắt!',
          message: err.message 
        });
      });
  };

  const test404Error = () => {
    setTestResult({ type: 'testing', message: 'Testing 404 error...' });
    
    fetch('https://jsonplaceholder.typicode.com/users/99999')
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP Error 404: Not Found`);
        }
        return res.json();
      })
      .catch(err => {
        setTestResult({ 
          type: 'error',
          title: 'Lỗi 404 Được Bắt!',
          message: err.message 
        });
      });
  };

  const test500Error = () => {
    setTestResult({ 
      type: 'error',
      title: 'Giả Lập Lỗi 500',
      message: 'HTTP Error 500: Server đang gặp sự cố' 
    });
  };

  const testJSONError = () => {
    setTestResult({ type: 'testing', message: 'Testing JSON parse error...' });
    
    // Fetch HTML page which will fail JSON parsing
    fetch('https://httpbin.org/html')
      .then(res => {
        const contentType = res.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Response is not JSON format');
        }
        return res.json();
      })
      .catch(err => {
        setTestResult({ 
          type: 'error',
          title: 'Lỗi JSON Được Bắt!',
          message: err.message 
        });
      });
  };

  const testValidRequest = () => {
    setTestResult({ type: 'testing', message: 'Testing valid request...' });
    
    fetch('https://jsonplaceholder.typicode.com/users/1')
      .then(res => res.json())
      .then(data => {
        setTestResult({ 
          type: 'success',
          title: 'Request Thành Công!',
          message: `Loaded user: ${data.name}` 
        });
      })
      .catch(err => {
        setTestResult({ 
          type: 'error',
          message: err.message 
        });
      });
  };

  return (
    <Container className="py-5">
      <Card className="shadow-lg mb-4">
        <Card.Header style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }} className="text-white">
          <h2 className="mb-0">
            <i className="bi bi-bug me-2"></i>
            Error Handling Test Page
          </h2>
        </Card.Header>
        <Card.Body>
          <p className="lead mb-4">
            Trang này kiểm tra các loại lỗi được bắt và hiển thị thông báo:
          </p>

          <Row className="g-3 mb-4">
            <Col md={6}>
              <Card className="h-100 border-danger">
                <Card.Body>
                  <h5 className="text-danger">
                    <i className="bi bi-wifi-off me-2"></i>
                    Lỗi Mất Mạng
                  </h5>
                  <p className="text-muted">Kiểm tra khi không kết nối được server</p>
                  <Button variant="danger" onClick={testNetworkError} className="w-100">
                    Test Network Error
                  </Button>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6}>
              <Card className="h-100 border-warning">
                <Card.Body>
                  <h5 className="text-warning">
                    <i className="bi bi-search me-2"></i>
                    Lỗi 404 Not Found
                  </h5>
                  <p className="text-muted">Kiểm tra khi tài nguyên không tồn tại</p>
                  <Button variant="warning" onClick={test404Error} className="w-100">
                    Test 404 Error
                  </Button>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6}>
              <Card className="h-100 border-danger">
                <Card.Body>
                  <h5 className="text-danger">
                    <i className="bi bi-server me-2"></i>
                    Lỗi 500 Server Error
                  </h5>
                  <p className="text-muted">Giả lập lỗi server</p>
                  <Button variant="danger" onClick={test500Error} className="w-100">
                    Test 500 Error
                  </Button>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6}>
              <Card className="h-100 border-info">
                <Card.Body>
                  <h5 className="text-info">
                    <i className="bi bi-file-code me-2"></i>
                    Lỗi JSON Parse
                  </h5>
                  <p className="text-muted">Kiểm tra khi dữ liệu không phải JSON</p>
                  <Button variant="info" onClick={testJSONError} className="w-100">
                    Test JSON Error
                  </Button>
                </Card.Body>
              </Card>
            </Col>

            <Col md={12}>
              <Card className="h-100 border-success">
                <Card.Body>
                  <h5 className="text-success">
                    <i className="bi bi-check-circle me-2"></i>
                    Request Hợp Lệ
                  </h5>
                  <p className="text-muted">Kiểm tra request thành công</p>
                  <Button variant="success" onClick={testValidRequest} className="w-100">
                    Test Valid Request
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {testResult && (
            <Alert 
              variant={
                testResult.type === 'success' ? 'success' : 
                testResult.type === 'error' ? 'danger' : 
                'info'
              }
              className="mb-0"
            >
              <Alert.Heading>
                {testResult.type === 'success' && <i className="bi bi-check-circle-fill me-2"></i>}
                {testResult.type === 'error' && <i className="bi bi-exclamation-triangle-fill me-2"></i>}
                {testResult.type === 'testing' && <i className="bi bi-hourglass-split me-2"></i>}
                {testResult.title || (testResult.type === 'testing' ? 'Đang Kiểm Tra...' : 'Kết Quả')}
              </Alert.Heading>
              <hr />
              <p className="mb-0 font-monospace">{testResult.message}</p>
            </Alert>
          )}
        </Card.Body>
      </Card>

      <Card className="shadow">
        <Card.Header className="bg-info text-white">
          <h5 className="mb-0">
            <i className="bi bi-info-circle me-2"></i>
            Cách Kiểm Tra Lỗi Thực Tế
          </h5>
        </Card.Header>
        <Card.Body>
          <h6 className="fw-bold">Để test các lỗi thực tế:</h6>
          <ol>
            <li>
              <strong>Lỗi Mất Mạng:</strong>
              <ul>
                <li>Tắt WiFi/Data trên máy tính</li>
                <li>Truy cập vào trang Users hoặc Posts</li>
                <li>Bật lại mạng và click "Thử Lại"</li>
              </ul>
            </li>
            <li>
              <strong>Lỗi 404:</strong>
              <ul>
                <li>Truy cập URL không tồn tại: <code>/users/999999</code></li>
                <li>ErrorBoundary sẽ hiển thị thông báo lỗi</li>
              </ul>
            </li>
            <li>
              <strong>Lỗi JSON:</strong>
              <ul>
                <li>API trả về HTML thay vì JSON</li>
                <li>System sẽ phát hiện và báo lỗi</li>
              </ul>
            </li>
          </ol>

          <Alert variant="success" className="mt-3 mb-0">
            <i className="bi bi-check2-all me-2"></i>
            <strong>Tất cả lỗi đều được bắt và hiển thị thông báo rõ ràng!</strong>
            <ul className="mb-0 mt-2">
              <li>✅ Console logs chi tiết</li>
              <li>✅ ErrorBoundary UI với thông tin lỗi</li>
              <li>✅ Gợi ý khắc phục cụ thể</li>
              <li>✅ Buttons để thử lại hoặc quay về</li>
            </ul>
          </Alert>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ErrorTestPage;
