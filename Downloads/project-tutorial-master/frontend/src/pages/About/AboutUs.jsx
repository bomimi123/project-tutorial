import React from 'react';
import './AboutUs.css';
import { assets } from '../../assets/assets.js';

const AboutUs = () => {
    return (
        <div className='about-us-page'>
            {/* Header Section */}
            <div className='about-header'>
                <h1 className='about-title'>Về Chúng tôi</h1>
                <p className='about-subtitle'>
                    Chúng tôi tin rằng món ăn là một tác phẩm nghệ thuật, và mỗi bữa ăn là một trải nghiệm đáng nhớ.
                </p>
            </div>

            {/* Our Story Section */}
            <div className='about-section'>
                <div className='section-content'>
                    <h2 className='section-title'>Câu chuyện của chúng tôi</h2>
                    <p className='section-text'>
                        Khởi nguồn từ niềm đam mê ẩm thực và mong muốn mang đến những bữa ăn chất lượng, chúng tôi đã thành lập cửa hàng với một sứ mệnh duy nhất: cung cấp các món ăn tươi ngon, bổ dưỡng và đầy sáng tạo. Từ những ngày đầu chỉ là một gian bếp nhỏ, đến nay chúng tôi đã phát triển thành một thương hiệu được nhiều người yêu mến. Mỗi món ăn đều được chế biến từ những nguyên liệu tươi mới nhất, được chọn lọc kỹ lưỡng từ các nhà cung cấp uy tín, đảm bảo hương vị và an toàn vệ sinh thực phẩm.
                    </p>
                </div>
                <div className='section-image'>
                    <img src="https://placehold.co/600x400/D0F0C0/333333?text=Bếp+trưởng+đang+nấu" alt="Bếp trưởng đang nấu ăn" />
                </div>
            </div>

            {/* Our Journey Video Section */}
            <div className='video-section'>
                <h2 className='video-title'>Hành trình của chúng tôi</h2>
                <p className='video-description'>
                    Hãy cùng xem video để khám phá quy trình làm việc tỉ mỉ và tâm huyết của đội ngũ chúng tôi.
                </p>
                <video className='about-video' controls autoPlay muted>
                    <source src="https://vimeo.com/595762299?_ga=2.97553757.398826038.1758340521-1556754245.1754639996" type="video/mp4" />
                    Trình duyệt của bạn không thể hỗ trợ thẻ video
                </video>
            </div>

            {/* Our Mission Section */}
            <div className='about-section reverse'>
                <div className='section-content'>
                    <h2 className='section-title'>Sứ mệnh của chúng tôi</h2>
                    <p className='section-text'>
                        Sứ mệnh của chúng tôi không chỉ dừng lại ở việc tạo ra những bữa ăn ngon. Chúng tôi muốn xây dựng một cộng đồng những người yêu ẩm thực, nơi mọi người có thể chia sẻ niềm vui và những khoảnh khắc đáng nhớ bên nhau. Chúng tôi luôn lắng nghe ý kiến của khách hàng để không ngừng cải thiện và mang đến những dịch vụ tốt nhất.
                    </p>
                    <ul className='mission-list'>
                        <li><span className="list-icon">✓</span> Phục vụ các món ăn chất lượng cao, an toàn.</li>
                        <li><span className="list-icon">✓</span> Tạo ra trải nghiệm ẩm thực độc đáo.</li>
                        <li><span className="list-icon">✓</span> Xây dựng mối quan hệ bền vững với khách hàng.</li>
                    </ul>
                </div>
                <div className="section-image">
                    <img src="https://placehold.co/600x400/98C1D9/333333?text=Đội+ngũ+chuyên+nghiệp" alt="Đội ngũ chuyên nghiệp của chúng tôi" />
                </div>
            </div>

            {/* Our Team Section */}
            <div className="about-section team-section">
                <div className="section-content">
                    <h2 className="section-title">Đội Ngũ</h2>
                    <p className="section-text">
                        Đội ngũ của chúng tôi là những con người tài năng, nhiệt huyết và có chung niềm đam mê ẩm thực. Từ những đầu bếp giàu kinh nghiệm cho đến đội ngũ phục vụ tận tâm, mỗi thành viên đều đóng góp vào sự thành công của cửa hàng.
                    </p>
                    <div className="team-members">
                        <div className="member-card">
                            <img src="https://placehold.co/300x300/F4A261/333333?text=Chuyên+gia+đầu+bếp" alt="Ảnh thành viên đội ngũ 1" />
                        </div>
                        <div className="member-card">
                            <img src="https://placehold.co/300x300/F1FAEE/333333?text=Quản+lý+dịch+vụ" alt="Ảnh thành viên đội ngũ 2" />
                        </div>
                        <div className="member-card">
                            <img src="https://placehold.co/300x300/A8DADC/333333?text=Chuyên+viên+chăm+sóc+khách+hàng" alt="Ảnh thành viên đội ngũ 3" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AboutUs;
