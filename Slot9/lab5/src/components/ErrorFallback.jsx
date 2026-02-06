import React from 'react';
import { Alert, Button, Container } from 'react-bootstrap';

const ErrorFallback = ({ error, resetError }) => {
  const getErrorType = (error) => {
    const message = error?.message || '';
    
    if (message.includes('Failed to fetch') || message.includes('NetworkError')) {
      return {
        type: 'network',
        title: 'Lỗi Kết Nối Mạng',
        icon: 'bi-wifi-off',
        description: 'Không thể kết nối đến server. Vui lòng kiểm tra kết nối internet của bạn.'
      };
    }
    
    if (message.includes('404')) {
      return {
        type: '404',
        title: 'Không Tìm Thấy Dữ Liệu',
        icon: 'bi-search',
        description: 'Dữ liệu bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.'
      };
    }
    
    if (message.includes('500') || message.includes('502') || message.includes('503')) {
      return {
        type: 'server',
        title: 'Lỗi Server',
        icon: 'bi-server',
        description: 'Server đang gặp sự cố. Vui lòng thử lại sau ít phút.'
      };
    }
    
    if (message.includes('JSON') || message.includes('parse')) {
      return {
        type: 'json',
        title: 'Lỗi Định Dạng Dữ Liệu',
        icon: 'bi-file-code',
        description: 'Dữ liệu nhận được không đúng định dạng JSON.'
      };
    }
    
    return {
      type: 'unknown',
      title: 'Đã Xảy Ra Lỗi',
      icon: 'bi-exclamation-triangle',
      description: 'Có lỗi xảy ra trong quá trình xử lý. Vui lòng thử lại.'
    };
  };

  const errorInfo = getErrorType(error);

  return (
    <Container className="py-5">
      <Alert variant="danger" className="shadow-lg border-0">
        <div className="d-flex align-items-start">
          <i className={`${errorInfo.icon} fs-1 text-danger me-3`}></i>
          <div className="flex-grow-1">
            <Alert.Heading className="mb-3">
              {errorInfo.title}
            </Alert.Heading>
            <p className="mb-3 fs-5">
              {errorInfo.description}
            </p>
            
            <div className="bg-light p-3 rounded mb-3">
              <strong className="text-muted">Chi tiết lỗi:</strong>
              <div className="mt-2 text-danger font-monospace small">
                {error?.message || 'Unknown error'}
              </div>
            </div>

            <div className="d-flex gap-2 flex-wrap">
              <Button 
                variant="danger" 
                onClick={resetError}
                className="d-flex align-items-center"
              >
                <i className="bi bi-arrow-clockwise me-2"></i>
                Thử Lại
              </Button>
              <Button 
                variant="outline-danger" 
                onClick={() => window.location.href = '/'}
              >
                <i className="bi bi-house me-2"></i>
                Về Trang Chủ
              </Button>
              <Button 
                variant="outline-secondary" 
                onClick={() => window.history.back()}
              >
                <i className="bi bi-arrow-left me-2"></i>
                Quay Lại
              </Button>
            </div>

            {process.env.NODE_ENV === 'development' && (
              <details className="mt-4">
                <summary className="text-muted" style={{ cursor: 'pointer', fontWeight: 'bold' }}>
                  <i className="bi bi-code-slash me-2"></i>
                  Stack Trace (Development Only)
                </summary>
                <pre className="mt-2 p-3 bg-dark text-white rounded small" style={{ overflow: 'auto', maxHeight: '300px' }}>
                  {error?.stack || 'No stack trace available'}
                </pre>
              </details>
            )}
          </div>
        </div>
      </Alert>

      <Alert variant="info" className="mt-3">
        <div className="d-flex align-items-start">
          <i className="bi bi-info-circle-fill fs-5 me-2"></i>
          <div>
            <strong>Gợi ý khắc phục:</strong>
            <ul className="mb-0 mt-2">
              {errorInfo.type === 'network' && (
                <>
                  <li>Kiểm tra kết nối WiFi hoặc dữ liệu di động</li>
                  <li>Tắt VPN nếu đang sử dụng</li>
                  <li>Thử tải lại trang (F5 hoặc Ctrl+R)</li>
                </>
              )}
              {errorInfo.type === 'server' && (
                <>
                  <li>Đợi vài phút rồi thử lại</li>
                  <li>Xóa cache trình duyệt</li>
                  <li>Liên hệ admin nếu lỗi vẫn tiếp diễn</li>
                </>
              )}
              {errorInfo.type === '404' && (
                <>
                  <li>Kiểm tra lại URL</li>
                  <li>Quay về trang chủ và điều hướng lại</li>
                  <li>Dữ liệu có thể đã bị xóa</li>
                </>
              )}
              {(errorInfo.type === 'json' || errorInfo.type === 'unknown') && (
                <>
                  <li>Thử tải lại trang</li>
                  <li>Xóa cache và cookies</li>
                  <li>Liên hệ hỗ trợ nếu vấn đề vẫn còn</li>
                </>
              )}
            </ul>
          </div>
        </div>
      </Alert>
    </Container>
  );
};

export default ErrorFallback;
