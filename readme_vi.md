14-10-2017  JAWS script cho Audacity V2.0 (cho phiên bản script 2.2.0) bởi Gary Campbell <campg2003@gmail.com> và Đặng Mạnh Cường <dangmanhcuong@gmail.com>

Gói script này hỗ trợ cho Audacity 2.0.0 trở lên, bao gồm Audacity 2.2.0.

# Các tính năng:
 - Cung cấp các phím lệnh để xem điểm bắt đầu, điểm kết thúc vùng chọn hoặc độ dài và vị trí của đoạn âm thanh ở bất  cứ đâu trong cửa sổ chính.
- Các phím lệnh di chuyển con trỏ đến bảng điều khiển vùng chọn.
- Hiển thị phím tắt của Audacity và của Jaws cho Audacity.
- Tiếp cận được trang hướng dẫn sử dụng Audacity  với Jaws của David Bailes bằng phím lệnh Insert+W.
- Đọc các vùng của cửa sổ chính, tức các thanh công cụ toolbars, bảng phân bố track (track panel) và thanh lựa chọn (selection bar) khi di chuyển con trỏ giữa chúng.
- Đọc tên thanh công cụ khi con trỏ di chuyển từ thanh công cụ này sang thanh công cụ khác.
- Khi con trỏ đang ở giữa các thanh công cụ, bấm `CTRL+tab` để di chuyển đến phần điều khiển đầu tiên của thanh công cụ kế tiếp và `CTRL+shift+tab` để đến phần điều khiển cuối của thanh công cụ trước.
- Có thể cấu hình để phát thử âm thanh tại vị trí con trỏ khi bấm mũi tên trái / phải và Audacity dừng khi con trỏ ở trong bản phân bố track  (track panel).
- Có thể cấu hình để đọc vị trí con trỏ khi bấm mũi tên trái hoặc phải trong lúc Audacity dừng và con trỏ đang ở trong bảng phân bố track.
- Có thể cấu hình cho các phím lệnh mở rộng hoặc thu hẹp vùng chọn thông báo vị trí mới của vùng chọn hay phát thử vùng chọn đó.
- Thông báo không có project khi thực hiện các hoạt động bắt buộc phải có project được mở.
- Cung cấp các phím lệnh để đọc giá trị (maximum peak) khi thu / phát.
- Track gain (chỉnh âm) và pan control (chỉnh độ cân bằng) được kích hoạt khi con trỏ PC hoạt động và đang ở trong cửa sổ chính. Trường hợp khác, Jaws sẽ kích hoạt tính năng di chuyển chuột.
- Trong nhiều VST plug-in, có các phím lệnh để di chuyển con trỏ đến  điều khiển Presets và kích hoạt tính năng lưu hay gọi Presets.
- Trong nhiều hộp thoại plug-in, tên và giá trị của các điều khiển đã được Jaws đọc. 
- Hỗ trợ nhiều ngôn ngữ. Đã hỗ trợ tiếng Anh, tiếng Đức và Tây Ban Nha. Tập tin Readme cũng đã được dịch ra tiếng Việt bởi Đặng Mạnh Cường, Nguyễn Hoàng Giang và Lê Thị Thêu. Xem tập tin audacity_readme_vi.html trong thư mục cài đặt trong Program Files.
- Khi ở cửa sổ chính, JAWSKey+Shift+mũi tên xuống (SaySelectedText) đọc số track (hoặc tên nếu bấm nhanh hai lần) tại track được chọn.
- Bạn có thể đi đến một track bằng cách nhập số cụ thể. Bạn cũng có thể chuyển một track đến một vị trí xác định bằng số. Bạn cũng có thể đánh dấu một điểm "mark" trên track rồi sau đó trở lại điểm đã đánh dấu, hoặc chuyển một track đến đó. 
- Có phản hồi khi di chuyển bằng bàn phím (xem thêm bên dưới).
- Bản cài đặt hiện tại có thể sử dụng cho tất cả tài khoản (all user) hay tài khoản hiện tại (current user)và có thể cài vào thư mục Shared , bao gồm cài trên Jaws 17.
- Khi đang phát hay thu âm, phím `Enter` có chức năng tạm dừng hoặc tiếp tục. Trường hợp này, muốn bấm `Enter` thì hãy bấm `Ctrl+Enter`. Tôi thích tính năng này vì phím `Enter` ở bàn phím số dễ tìm hơn nút “p” khi bạn rời tay khỏi bàn phím. Tính năng này có thể bật / tắt thông qua tùy chọn trong Adjust Jaws options. Hãy thử và cho chúng tôi biết nếu nó hữu ích với bạn và nếu bạn thích nó. 

# cài đặt / gỡ cài đặt script:

## Cài đặt:

1. chép bản cài đặt vào thư mục bất kỳ trong máy.
2. Chạy nó lên để cài đặt.

Bộ cài đặt hỗ trợ 3 tùy chọn:

- Just Scripts: Cài script nhưng không có phần gỡ cài đặt, hoặc thư mục trong %ProgramFiles% 
- Full: cài script trong thư mục script với phiên bản/ngôn ngữ được chọn, tạo thư mục trong `%programfiles%` (`%localappdata%` cho tài khoản hiện tại), có phần gỡ cài đặt và thêm các tập tin như readme chẳng hạn.
- Custom: giống với Full nhưng cho phép cài các tập tin nguồn của bộ cài đặt. 

Với chế độ full hay custom cho tất cả tài khoản, phần gỡ cài đặt và các tập tin readme được lưu trong thư mục cài đặt. 

Nếu chọn Just Scripts , tập tin What’s new và README sẽ được cài vào thư mục JAWS scripts cho từng phiên bản, và `What’s new.md` sẽ được đổi thành `audacity_whatsnew.md`. Tập tin readme tiếng Việt sẽ không được cài đặt với lựa chọn này.

Trang Versions/Languages  hiển thị danh sách các phiên bản jaws / các ngôn ngữ được cài đặt trên máy bạn.  Bấm `khoảng trắng` để chọn phiên bản Jaws bạn muốn cài đặt script.  Script sẽ được biên dịch lại cho mỗi phiên bản được chọn.  Lưu ý rằng  script sẽ chỉ được biên dịch cho ngôn ngữ của phiên bản jaws đang chạy.

Nếu tài khoản quản trị cho phép cài đặt cho tất cả tài khoản, lựa chọn all user sẽ được thực hiện. Nếu không lựa chọn current user sẽ được thực hiện. Nếu tài khoản quản trị cho phép cài đặt cho tất cả các tài khoản, lựa chọn current user có thể BUỘC thực hiện bằng cách thêm lệnh chuyển `/curentuser`.   

Khi cài cho tất cả tài khoản, ở trang chọn phiên bản / ngôn ngữ, người dùng có thể chọn cài Script cho tài khoản hiện tại hoặc tất cả tài khoản.

Nếu muốn hiệu chỉnh bộ cài đặt, hay chỉ đơn giản là muốn khám phá nó, bạn có thể cài installer source bằng cách chọn Custom install  >  Installer source.

## Gỡ cài đặt:
Gói cài đặt có thể được gỡ thông qua Program And Features (Add/Remove Programs). Bạn cũng có thể chạy tập tin `uninst.exe`   trong thư mục cài đặt (`%programfiles(x86)%\Jaws Script for Audacity` hoặc `%localappdata%\Jaws Script for Audacity`).

Nếu trình gỡ cài đặt nhận thấy các tập tin script đã được chỉnh sửa, nó sẽ yêu cầu xác nhận trước khi gỡ chúng. Nếu chọn yes thì các tập tin đã chỉnh sửa sẽ bị xóa, no thì ngược lại. các tập tin (`audacity.jcf` hoặc `audacity.jsi`) sẽ không bị xóa.

#Sử dụng script

Lưu ý: Script có đọc tên của vài phím nóng trong Audacity, và dùng vài phím lệnh khác để thực hiện một số hoạt động. Nếu bạn thay đổi các phím này trong Preferences > Keyboard, bạn phải thay đổi luôn trong tập tin `audacity.jkm` để script tiếp tục làm việc hiệu quả. Vài tính năng của script có thể không hoạt động với phím lệnh mặc định.

## Căn bản
Khi được cài đặt, script sẽ đọc thông điệp chào mừng ở lần đầu tiên khởi chạy Audacity. Bạn có thể xem danh sách các phím nóng được script cung cấp bằng cách bấm    `JAWSKey+h` (`HotKeyHelp`). Bạn cũng có thể xem các phím nóng của Audacity bằng cách bấm `JAWSKey+w`. Ở đây cũng có liên kết đến trang hướng dẫn sử dụng Audacity với Jaws bằng tiếng Anh, viết bởi David Bailes, mở bằng trình duyệt của bạn.

Bạn có thể đọc trường bắt đầu và kết thúc / độ dài của vùng chọn bằng tổ hợp phím `Alt+[` và `Alt+]`. Bấm nhanh hai lần sẽ di chuyển con trỏ đến các trường này. Lưu ý rằng các phiên bản Audacity trước 2.2.0, `Alt sẽ đọc là “end” hoặc “length” tùy theo thiết lập ở phần Selection bar radio buttons.

Khi con trỏ PC hoạt động, bấm `Alt+DEL` sẽ đọc giá trị của trường vị trí (Audio Position). (điều này có lợi khi đang nghe hoặc thu âm). Bấm nhanh hai lần để thực hiện tính năng gốc của lệnh này.

Bấm `JAWSKey+DEL` để biết trạng thái hiện tại của Audacity: stopped (dừng), play (phát), play pause (tạm dừng), record (thu âm), hoặc record pause (tạm dừng thu). (thông tin này cũng hiển thị trên thanh trạng thái của các phiên bản Audacity gần đây). 

Trong Audacity 2.2.0, thanh lựa chọn End/Length radio button đã được thay thế bằng một hộp xổ có thêm vài lựa chọn. Có các phím lệnh để đọc và thiết lập cho điều khiển này. Tất cả chúng đều bắt đầu bằng `JAWSKey+a, p`.  Rồi bấm một trong các phím sau:

- `s` hoặc `1`: thiết lập là bắt đầu / kết thúc (Start / End)
- `l` hoặc `2`: thiết lập là bắt đầu và độ dài (start / length)
- `e` hoặc `3`: thiết lập độ dài và kết thúc (length / end)
- `c` hoặc `4`: chọn độ dài và ở giữa (length / center)
- `p`: đọc thiết lập hiện tại
- `?`: đọc thông tin giúp đỡ cho nhóm phím này.

`Alt+[` đọc giá trị được liệt kê đầu tiên và `Alt+RightArrow` đọc giá trị thứ hai.  Sau khi bấm `?` bạn có thể bấm một trong các phím này mà không cần lặp lại tổ hợp phím để mở nhóm lệnh này.

    có thể xem thông tin về phiên bản của script  bằng cách bấm nhanh hai lần `JAWSKey+CONTROL+V` để hiển thị trên cửa sổ ảo. (Virtual Viewer). Thông tin này  cũng hiển thị trong phần JAWS hot key help.

URL truy cập trang hướng dẫn sử dụng Audacity với Jaws có thể được chỉnh sửa bằng phím `Control+Shift+j`. Lệnh này mở ra một hộp thoại với ô nhập liệu có sẵn URL hiện tại. Hãy chỉnh sửa nó rồi bấm OK để lưu lại.

Khi nhập một nhãn (label) vào label track, Jaws thường đọc các phím lệnh của Audacity, dù rằng nó là những kí tự đã được nhập vào tên của label. Chúng tôi đã khắc phục tình trạng trên nếu bạn đặt tên cho label bằng phương pháp chuẩn. Tính năng này được kích hoạt bằng `Ctrl+B` hay `Ctrl+M`. Và ngưng hoạt động khi bạn bấm `Enter` (hoặc bấm mũi tên di chuyển tới track khác hay con trỏ di chuyển khỏi bản phân bố track). Nó sẽ không hoạt động nếu bạn di chuyển tới track label và viết tên cho label. Nếu bạn thay đổi phím lệnh này trong Audacity, bạn cũng phải thay đổi luôn trong tập tin `Audacity.jkm`.

Khi con trỏ ở trong track label, bấm `Tab` để Jaws đọc tên label hiện tại. Tính năng này không phải lúc nào cũng hoạt động. Nhất là khi có quá nhiều label.

## Nghe thử âm thanh
Bạn có thể cấu hình để script phát âm thanh sau khi dùng các lệnh điều chỉnh con trỏ. Có hai tùy chọn cho việc này nằm trong Quick Settings. Thông báo  các vị trí điều khiển và đọc hay không đọc vị trí con trỏ với các lệnh di chuyển. Nếu bật Preview Motion, phím lệnh phát thử (`Shift+F6` cho điểm bắt đầu và `Shift+F7` cho điểm kết thúc). Nó được thực hiện theo con trỏ. Điều này cho phép bạn nghe một phần âm thanh ở điểm bắt đầu hay kết thúc vùng chọn. Lưu ý rằng độ dài của đoạn âm thanh này sẽ lớn hơn khi di chuyển qua nó bằng con trỏ. Bạn có thể tạm thời chuyển đổi giữa đọc vị trí (speaking position) và phát âm thanh (playing audio) bằng lệnh `JAWSKey+p`.  Thiết lập sẽ trả về giá trị được chọn bởi Quick Settings nếu hộp thoại này đang mở hoặc con trỏ chuyển ra khỏi cửa sổ Audacity và chuyển trở về.

Khi ở trường bắt đầu / kết thúc chọn (selection start/end), `Shift+mũi tên lên` và `Shift+mũi tên xuống` sẽ âm thầm tăng và giảm thông số rồi mới phát thử.

Có vài phím lệnh  để thực hiện việc   phát thử, và cũng dễ tiếp cận hơn.  Trong bản phân bố track và thanh lựa chọn, `JAWSKey+mũi tên trái` thực hiện lệnh `Shift+F6` và `JAWSKey+mũi tên phải` thực hiện `Shift+F7`. Các lệnh này phát đoạn đầu và  cuối của vùng chọn (ở trong vùng chọn).  Thêm phím Shift sẽ phát đoạn đầu và cuối (ngoài) vùng chọn.

`JAWSKey+a,s` (nhóm lệnh rút gọn) cũng có thể thực thi các lệnh phát thử.  Điều này có thể có ích cho các Laptop yêu cầu bạn phải giữ phím `FN` để thực hiện các lệnh.  Khi kích hoạt nhóm lệnh này, `j`, `k`, `l`, và `;` thực thi `Shift+F5` đến `Shift+F8`.  `Control+j` thực thi `Control+Shift+F5` và `Control+l` thực thi `Control+Shift+F7`.  Nhóm lệnh này cũng thực thi các phím mũi tên trái / phải, Shift và `Shift+Control` mũi tên trái / phải, và `c`.  `?` đọc thông tin giúp đỡ của nhóm lệnh.  Khi kích hoạt  nhóm lệnh này, bạn có thể bấm bất kì phím lệnh nào mà không cần bấm phím để vào nhóm lệnh.  Bấm `ESC` hay một phím không thuộc nhóm lệnh này sẽ thoát ra khỏi nó.

## Các tùy chọn cho Script

Script có vài tùy chọn để điều khiển một số tính năng, có thể truy cập bằng lệnh `JAWSKey + v`. Đối với các phiên bản trước JAWS 13, thiết lập này được lưu trữ trong tập tin `Audacity. JSI` trong thư mục PersonalSettings của JAWS. Đối với các phiên bản sau 13, chúng được lưu trữ trong tập tin `audacity.jcf` trong phần `NonJCFOptions`. Nếu bạn nâng cấp từ một phiên bản JAWS trước 13 lên jaws 13 hay cao hơn, các thiết lập này không được Jaws chuyển từ `audacity.jsi`, vì vậy, bạn sẽ phải thiết lập lại. 

## Đi đến và di chuyển track

Có thể đi đến một track bằng số của nó, di chuyển một track đến một vị trí khác cũng bằng số và nhớ vị trí  của một track để trở lại sử dụng sau, hay di chuyển một track khác đến vị trí đó. Jaws cũng sẽ thông báo nếu bạn di chuyển track bằng bàn phím. Tính năng này chỉ hoạt động với Audacity 2.1.1 trở lên, và yêu cầu phải cấu hình vài thứ trong Audacity. Bạn phải gán phím nóng `Control+Shift+ Mũi Tên lên` cho lệnh `move focus track up`, `Control+Shift+ Mũi Tên Xuống` cho lệnh move track down. Để làm điều đó:

1. Tại cửa sổ Audacity, mởPreferences (`Control+P`) và bấm `K` để đi đến nhánh keyboard.
2. Bấm Tab đến ô nhập liệu và gõ "move focused" (tôi dùng Tree view).
3. BấmTab đến Tree view và tìm `Move focused track down`.
4. bấm tab đến Shortcut và bấm `Control+Shift+Mũi Tên Xuống`.
5. Bấm Tab đến nút `Set` rồi bấm khoảng trắng để kích hoạt
6. Bấm `Shift+Tab` hai lần để trở về Tree view.
7. Tìm lệnh `Move focused track up` và gán phím nóng `Ctrl+Shift+Mũi Tên Lên` như các bước trên.
8. Bấm Tab đến OK và bấm khoảng trắng.

Nếu muốn dùng các phím khác, bạn phải gán lại trong tập tin `Audacity.jkm`.

Sau khi thiết lập như trên, bạn có thể đi đến một track bằng phím `JawsKey+A, G`. Script sẽ yêu cầu nhập số. Có thể nhập số của track để đi đến nó. Thêm vào dấu cộng (`+`) để di chuyển xuống phía dưới (track có số lơn hơn), hay thêm dấu trừ (`-`)để di chuyển lên trên. Bạn có thể di chuyển một track bằng lệnh `Jawskey+a, M`. Bạn có thể đánh dấu track hiện tại bằng  lệnh `Jawskey+A, K` và di chuyển tới nó bằng lệnh Jawskey+A, Shift+G và di chuyển track hiện tại đến vị trí đã đánh dấu bằng lệnh `Jawskey+A, Shift+M`.

## Xác định tốc độ
Lệnh `JAWSKey+a,t` cho phép bạn xác định tốc độ (tempo) bằng cách tap (gõ nhịp) theo nhạc.  Để làm điều này, chuyển về đầu đoạn âm thanh  rồi bấm `JAWSKey+a,t,khoảng trắng`.  Audacity bắt đầu phát âm thanh.  Trong khi đang phát, bấm `ENTER` cho mỗi nhịp (beat).  Khi bấm `khoảng trắng` lần nữa, tốc độ sẽ được đọc lên.  `a` đọc lại thông tin này.  `c` chép vào bộ nhớ tạm.  Giá trị của tempo is được giữ lại đến khi bấm `khoảng trắng` thêm lần nữa.  Tính năng này dựa trên tính năng tương tự trong NVDA add-on của Robert Hänggi, dù rằng dùng thuật toán khác.  

Lưu ý: Có một cách thực hiện khác  của tính năng này gần với thuật toán của NVDA nhưng bắt buộc phải dùng JAWS từ bản 11 update 1.  Để kích hoạt, gọi chạy Audacity và mở Script Manager bằng phím lệnh `JAWSKey+0` (trên bàn phím chữ).  Bạn có thể xác định các phần có liên quan bằng cách tìm cụm từ "JAWS 11".  Có hai phần  cần phải bỏ đánh dấu chú thích và một phần cần đánh dấu chú thích.  Để bỏ chú thích một phần, đặt dấu chấm phảy (;) đầu dòng `/*` và `*/` ở đầu / cuối của phần đó.  Để bỏ chú thích, xóa dấu chấm phảy trước dòng `/*` và `*/`, rồi bấm `Control+s` để lưu và biên dịch script.

# Các tồn tại: 

1. Phiên bản  script này có khả năng  ngưng đọc trong các hiệu ứng như Amplify. Tuy nhiên, đôi khi nó không hoạt động. Trường hợp này,  chuyển con trỏ của Audacity sang cửa sổ khác rồi trở lại thì sẽ khắc phục được.

2. Các vùng vị trí đôi khi không được rút ngắn. Điều này xảy ra vì hàm `GetWindowsText` của Jaws chỉ trả về số mà không có chữ H, M,:, VV. Chúng tôi không biết nguyên nhân gây ra lỗi này. Tôi đã khắc phục nó bằng cách tắt và khởi động lại Audacity. điều này đã được quan sát với JAWS 10, 15, 16, 17 và 18. Tôi đã quan sát thấy có đôi khi lỗi này không xảy ra.

3.  Nếu bật tính năng "ENTER Pauses during play/record" (mặc định được bật), `ENTER` sẽ không chọn / bỏ chọn track hiện tại trong khi phát hay thu âm. Trường hợp này, ta Sử dụng `Control+Enter` thay cho `Enter`. 

4.  Nếu bạn thiết lập cho phím  `numpad ENTER` và thiết lập JAWS để xử lý các phím mở rộng một cách riêng biệt, kể cả phím `Enter` cũng sẽ được đặt cho việc gõ phím `Enter`. Nếu bạn không thích tính năng này, có thể tắt nó bằng cách thêm một dấu chấm phẩy trên các dòng `ENTER`, `NumPadEnter` và `Control + ENTER` trong `audacity.jkm` và loại bỏ các dấu chấm phẩy trên dòng có chứa `/ *` và `* /` trước và sau scripts `Enter` và `CtrlEnter` trong `audacity.jss`. Nếu có thay đổi trong tập tin `Audacity.JSS`, vui lòng thay đổi giá trị ngày trong biến Version để chúng tôi biết đây là phiên bản chỉnh sửa trong trường hợp bạn liên hệ với chúng tôi.

5. Trình biên dịch Jaws Script chỉ hoạt động với ngôn ngữ mà Jaws đang chạy. Xem thêm bên dưới.

6. Các phiên bản trước 13.0, phím nóng để thiết lập cho script (`JAWSKey+v`) sẽ không hiển thị trong phần Hotkey Help. Tuy nhiên, nó vẫn hoạt động. Chúng tôi có thể khặc phục điều này nếu nó là một trở ngại nghiêm trọng với người dùng.


# Hỗ trợ đa  ngôn ngữ
Bộ cài đặt hỗ trợ cài Script cho nhiều ngôn ngữ. Bộ cài đặt này vẫn xử lí phần ngôn ngữ giống các bộ cài đặt trước. Vậy nên trang chọn phiên bản sẽ hiển thị theo kiểu 16.0/enu. Hiện nay, tiếng Anh, tiếng Đức và tiếng Tây Ban Nha đang được hỗ trợ.

Dù rằng bộ cài đặt thực hiện việc cài và biên dịch Script cho ngôn ngữ đã được chọn, nhưng Jaws Script Compiler thì luôn luôn biên dịch script cho ngôn ngữ mà jaws đang chạy. Vậy nên, sau khi cài Script, bạn phải chạy Jaws với ngôn ngữ đã chọn của script và biên dịch lại.

#lưu ý cho người viết script
Nếu có chỉnh sửa các tập tin của script, vui lòng cập nhật biến của phiên bản (Version Constain) ở dòng gần đầu tập tin `Audacity.jss`. Điều này rất quan trọng nếu bạn công bố script, dù bạn chỉ chỉnh sửa cho cá nhân bạn. Nó sẽ giúp chúng tôi biết rằng đây là phiên bản có chỉnh sửa trong trường hợp bạn liên lạc với chúng tôi về script này. 

Các thông điệp và chuỗi hằng được lưu trong `Audacity.JSM` và `Audacity.QSM`. Lưu ý rằng từ phiên bản 2.0.0, các tập tin lưu thông điệp phải dùng mã UTF8.

Các thông điệp của bộ cài đặt đã được bản địa hóa. Chúng đã được tách ra khỏi bộ cài nên người dùng có thể viết lại thông điệp cho từng ngôn ngữ. Hiện tại, tiếng Anh, tiếng Đức và tiếng Tây Ban Nha đã được hỗ trợ. Các thông điệp này được lưu trong các tập tin `.nsh` với các tên kiểu như  `*_enu.nsh` hay `*_lang_enu.nsh` . Chúng cũng dùng mã UTF8. Để tạo bộ cài đặt, phải dùng NSIS 3.0 trở lên.

Bộ cài đặt đã được tải lên GitHub tại địa chỉ <https://github.com/campg2j003/JAWS-Script-for-Audacity>.  Nếu bạn muốn đóng góp cho script, vui lòng xem tập tin [CONTRIBUTING.md](CONTRIBUTING.md).

# Lưu ý cho người biên dịch
Lưu ý rằng tập tin `Readme.HTML` đã được tạo từ tập tin `Readme.MD`, chỉ dùng được trên kho chia sẻ của GidHub. Vui lòng xem tập tin [CONTRIBUTING.md](CONTRIBUTING.md) để có thêm thông tin.

# Ghi công
- Viết Script: Gary Campbell và Đặng Mạnh Cường <dangmanhcuong@gmail.com>
- Phiên dịch tiếng Đức: Michael Vogt
- Phiên dịch tiếng Tây Ban Nha: Fernando Gregoire
- Tập tin Readme tiếng Việt: Nguyễn Hoàng Giang, Đặng Mạnh Cường và Lê Thị Thêu

# Kết luận
Gần đây, script được phát triển với Audacity 2.1.3, 2.2.0 alpha và beta. Nó sẽ hoạt động được với Các phiên bản Jaws từ 5.0 trở lên, dù rằng các tùy chọn cho Audacity trong phần Adjust Jaws Verbosity có vẻ chưa tốt lắm và cũng chưa được kiểm tra (tôi nhớ rằng chúng tôi đã dùng một hàm mà theo FSDN thì chỉ dùng được cho Jaws 10.0 trở lên). Các phiên bản gần đây được phát triển với Jaws 17, 18 và 2018 beta (build 1708.29) trên máy laptop chạy Windows 10 64 bit. Dù rằng vẫn hỗ trợ cho các phiên bản cũ của Jaws, chúng tôi vẫn chưa thử nghiệm điều đó. Hiện nay, chưa có hỗ trợ nào cho màn hình chữ nổi.

tôi sẵn sàng tiếp nhận những phản hồi cho script, cũng như các đề nghị để cải thiện, nhưng không thể hứa hẹn về  việc cập nhật nó.

# Dưới đây là bảng phím nóng hỗ trợ của jaws:

```
Để đọc điểm bắt đầu vùng chọn, bấm Alt+[.
Để đọc điểm kết thúc vùng chọn hoặc độ dài, bấm Alt+].
nếu muốn di chuyển con trỏ đến đó, bấm  tổ hợp phím trên nhanh hai lần.
để đọc trường vị trí Audio (Audio Position), bấm Alt+Delete.
 khi đã kích hoạt con trỏ PC, để đọc thông tin về con trỏ đang hoạt động, bấm Alt+Delete nhanh 2 lần.

để tăng gain của track tại vị trí con trỏ, bấm Alt+Shift+mũi tên lên.
Để giảm gain của track tại vị trí con trỏ, bấm Alt+Shift+mũi tên xuống.
để điều chỉnh âm thanh qua loa trái, bấm Alt+Shift+mũi tên trái.
để điều chỉnh âm thanh qua loa phải, bấm Alt+Shift+mũi tên phải.
4 phím nóng ở trên đã thay thế 4 phím di chuyển chuột của Jaws khi con trỏ ở cửa sổ chính của ứng dụng. Vì vậy, để sử dụng tính năng này, trước tiên, phải bật con trỏ Jaws.

Để đọc giá trị âm lượng khi thu âm (recording meter), bấm g.
Bấm nhanh hai lần để đưa con trỏ đến đồng hồ đo âm.
Để đọc giá trị âm lượng khi phát âm thanh (playback meter), bấm h.
Bấm nhanh hai lần để đưa con trỏ đến đồng hồ đo âm.

Để đi đến một track bằng số, bấm JAWSKey+a, g.
Để di chuyển track tại vị trí con trỏ đến một vị trí mong muốn, bấm JAWSKey+a, m.
Để đánh dấu track tại vị trí con trỏ, bấm JAWSKey+a, k.
Để đi đến track đã đánh dấu, bấm JAWSKey+a, Shift+g.
Để đi đến track được đánh dấu và đánh dấu điểm bắt đầu của track, bấm JAWSKey+a, x.
Để di chuyển con trỏ hiện tại đến vị trí của track đã được đánh dấu và để đánh dấu một điểm tại vị trí con trỏ, bấm Insert+a, Shift+m.

để bật / tắt chế độ đọc (speech) của Jaws, bấm Shift+Insert+S
để bật tắt các thông báo của Jaws với Audacity, bấm Ctrl+`. Tính năng  này giống với tùy chọn Announce Audacity messages trong Adjust Jaws Options.
xem tập tin Whats new.txt để biết thêm thông tin

ở một thanh công cụ muốn chuyển đến thanh công cụ tiếp theo, bấm Control+Tab
ở một thanh công cụ muốn chuyển đến thanh công cụ  trước đó, bấm Control+Shift+Tab

để jaws đọc trạng thái của chương trình (đang phát/tạm dừng/thu âm/tắt) bấm JAWSKey+delete
để trả các thiết lập của script về mặc định, bấm Shift+Control+`
để di chuyển giữa hai danh sách trong hộp thoại Edit Chains, bấm F6.

Để xem các phím nóng của Audacity, bấm Insert+w.
Để đọc các phím nóng mặc định của Windows, bấm Insert+w nhanh hai lần.

nếu bật tùy chọn "ENTER pauses during play/record", bấm Enter sẽ kích hoạt lệnh tạm dừng (Pause) khi phát âm thanh hoặc thu âm
bấm Ctrl+Enter để kích hoạt lệnh Enter trong trường hợp này.

Trong vài VST plugins thông thường, như là L1V:
Đưa con trỏ về ô Preset, bấm Alt+P.
Để tải một preset có sẵn, bấm  Alt+L.
Để lưu những thiết lập hiện tại thành preset, bấm Alt+S.

Nếu SilencePreview được bật và bạn bấm nút Preview trong một hiệu ứng, thỉnh thoảng, tính năng Silence không thể tắt được. Kết quả là các thông điệp xuất hiện khi thay đổi cửa sổ sẽ bị bỏ qua. Bạn có thể khắc phục bằng cách chuyển sang một cửa sổ khác rồi chuyển về Audacity.

Để thay đổi thiết lập cho script Audacity, bấm JAWSKey+V.

			Để thay đổi URL cho hướng dẫn sử dụng Audacity với Jaws, bấm Shift+Control+J

```

Hãy trải nghiệm!

