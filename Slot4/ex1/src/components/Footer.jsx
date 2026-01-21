function Footer({ myProfile }) {
  return (
    <footer style={{ backgroundColor: '#0d0d0d', borderTop: '1px solid #333' }}>
      <div className="text-center py-4">
        {/* hiển thị thông tin gồm Avatar, name và email */}
        <div className="mb-3">
          <img 
            src={myProfile.avatar} 
            alt="Avatar" 
            className="rounded-circle mx-auto d-block"
            style={{ 
              width: '70px', 
              height: '70px',
              objectFit: 'cover',
              border: '3px solid #ffc107',
              boxShadow: '0 4px 12px rgba(255,193,7,0.3)'
            }}
          />
        </div>
        <h5 className="text-white mb-2" style={{ fontWeight: '600', fontSize: '18px' }}>
          {myProfile.name}
        </h5>
        <p className="mb-0" style={{ color: '#aaa', fontSize: '14px' }}>
          {myProfile.email}
        </p>
        <div className="mt-3">
          <p style={{ color: '#666', fontSize: '13px', marginBottom: 0 }}>
            © 2026 Pizza House. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;