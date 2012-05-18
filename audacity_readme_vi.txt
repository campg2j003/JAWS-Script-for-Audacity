17//1/2013 Jaws script cho Audacity phiên bản 2.0
Tác giả: Gary Campbell <campg2003@gmail.com> và Đặng Mạnh Cường <dangmanhcuong@gmail.com>

Gói script này hỗ trợ phiên bản Audacity 2.0.0 trở lên.

Tính năng:
Có thể dùng các phím lệnh để xem điểm bắt đầu chọn, điểm kết thúc chọn hoặc độ dài và vị trí của audio ở bất cứ đâu trong cửa sổ chính.
Có các phím lệnh di chuyển focus đến bảng điều khiển các điểm chọn hay độ dài.
Hiển thị phím tắt của Audacity và của Jaws cho Audacity.
Đọc các vùng của cửa sổ chính, tức các thanh công cụ toolbars, bảng phân bố track (track panel) và thanh lựa chọn (selection bar) khi di chuyển focus giữa chúng.
Đọc tên thanh công cụ khi focus di chuyển từ thanh công cụ này sang thanh công cụ khác.
Khi focus đang ở giữa các thanh công cụ, nhấn CTRL+tab để di chuyển đến phần điều khiển đầu tiên của thanh công cụ kế tiếp và CTRL+shift+tab để đến phần điều khiển cuối của thanh công cụ trước.
Nhấn insert+delete để xem trạng thái của chương trình: stop, play, play pause, record hay record pause.
Đọc vị trí con trỏ khi nhấn mũi tên trái hoặc phải trong lúc Audacity dừng và focus đang ở trong bảng phân bố track (track panel).
Thông báo khi không có project nào được mở (không có track nào trong bảng phân bố) cho nhiều hoạt động. 
Track gain (chỉnh âm) và pan control (chỉnh độ cân bằng) được truyền cho ứng dụng khi con trỏ PC đang được kích hoạt và focus đang ở trong cửa sổ chính, trừ trường hợp chức năng di chuyển chuột được thực thi (PCCursor được kích hoạt)
Các phím lệnh để mở rộng hoặc thu ngắn vùng chọn sẽ thông báo vị trí mới hoặc độ dài mới của vùng chọn đó.
Trong nhiều VST plug-in có các phím lệnh để di chuyển focus đến các thiết lập đã được cài đặt trước (preset) và kích hoạt chức năng lưu (save) hoặc tải (load) các cài đặt này. 
Trong nhiều hộp thoại plug-in, tên và giá trị của các phần điều khiển sẽ được thông báo. 
Khi đang phát hay thu âm, phím enter sẽ có chức năng tạm dừng hoặc tiếp tục. Tôi thích chức năng này vì phím enter ở bàn phím số dễ tìm hơn nút “p” khi bạn rời tay khỏi bàn phím. Hãy thử và cho chúng tôi biết nếu nó có hiệu quả với bạn và nếu bạn thích nó. 
Script này được phát triển dựa trên phiên bản Audacity 2.0.2 với JAWS 10.0.1178u và 13. Nó hầu như có thể sử dụng với tất cả các phiên bản jaws sau 5.0 mặc dù các tùy chỉnh cho Audacity trong Adjust JAWS Verbosity có vẻ không ổn lắm. 
Không có hỗ trợ cụ thể cho màn hình chữ nổi tại thời điểm này. 

Các thông điệp (messages) và chuỗi (string constants) ở tập tin audacity.jsm tạo điều kiện thuận lợi cho việc biên dịch. 

Có thể xem phiên bản của script bằng cách nhấn nhanh hai lần CTRL+insert+v, phiên bản sẽ được hiển thị trên cửa sổ ảo (virtual viewer) hoặc xem trong phần giúp đỡ của Jaws (hotkey help).

Để cài đặt:
Tải tập tin cài đặt về máy.
Chạy tập tin để cài đặt. Nó cũng cho phép chọn phiên bản Jaws nào sẽ được cài script này và còn cho phép lựa chọn cài đặt cho tài khoản hiện tại hay cho tất cả người dùng trong máy. Nếu chọn chế độ cài đặt đầy đủ (full install), bạn có thể gỡ nó bằng Add or Remove Programs và nó sẽ tạo một thư mục trong Program Files để lưu các tập tin để gỡ. Nếu chọn chỉ cài đặt script (Just Scripts install), bạn không thể gỡ nó bằng Add or remove programs và nó cũng không tạo thư mục nào trong program files hay registry entry. 
Nếu bạn chọn (Just Scripts install), tập What’s new và README sẽ được cài vào thư mục JAWS scripts cho từng phiên bản, và What’s new.txt sẽ được đổi thành audacity_whatsnew.txt.  
Chương trình cài đặt sẽ biên dịch (compile) gói script cho từng phiên bản Jaws.
Nếu muốn hiệu chỉnh chương trình cài đặt, hay chỉ đơn giản là muốn khám phá nó, bạn có thể cài installer source bằng cách chọn Custom install  > Install Installer source component.

Một số vấn đề:
Chúng tôi đang gặp phải rắc rối về việc xác định các trạng thái play, pause, record và stop trong một số cấu hình máy. Trong hàm GetAudacityState có một số mã đã được ghi chú để xác định trạng thái (bật hay tắt( của các nút toolbar bằng việc kiểm tra tên của các graphic. Cũng có các hằng CS_IMG dành cho các trạng thái play, pause hay record không được ghi chú. Nếu mã hiện bạn đang dùng không hoạt động, mã này có thể hoạt động. Nó cần được chạy thêm nên nếu bạn cần nó, hãy nói với chúng tôi. 

Phần ghi vị trí thỉnh thoảng không được rút gọn. Điều này xảy ra do hàm GetWindowText chỉ trả về các con số mà không có chữ h, m hay dấu hai chấm (“:”). Chúng tôi vẫn chưa tìm ra nguyên nhân. Tôi có thể khắc phục nó bằng cách khởi động lại Audacity hoặc Jaws. Tôi không thể tìm thấy các ghi chú của tôi trong phần này. Bạn có thể tìm ra nó bằng Jaws 10. 

Khuyết điểm của  việc dùng phím enter để tạm dừng trong khi đang phát hoặc thu là bạn không thể chọn hay bỏ chọn track trong khi đang thu hoặc phát. Khi bạn định nghĩa lại phím enter trên bàn phím số và chỉnh cho Jaws xử lý các phím mở rộng riêng biệt thì cả hai phím enter đều được xem như một.  

Tôi rất mong những phản hồi và gợi ý để phát triển script nhưng không dám hứa chắc về việc sẽ sửa chữa được các vấn đề bạn nêu ra. 

