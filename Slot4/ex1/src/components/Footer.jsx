function Footer(myProfile) {
  return (
    <footer className="bg-light text-center text-lg-start">
      <div className="text-center p-3">
        {/* hiển thị thông tin gồm Avatar, name và email */}
        <img src={myProfile.avatar} alt="Avatar" className="rounded-circle" width="50" height="50" />
        <h5>{myProfile.name}</h5>
        <p>{myProfile.email}</p>
      </div>
    </footer>
  );
}

export default Footer;