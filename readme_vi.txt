2016-11-30  JAWS script cho Audacity V2.0 (cho phiên bản script 2.1.0 2016-11-30T04:37Z) bởi Gary Campbell <campg2003@gmail.com> và Đặng Mạnh Cường <dangmanhcuong@gmail.com>

Gói script này hỗ trợ cho Audacity 2.0.0 trở lên.

# Các tính năng:
 - Cung cấp các phím lệnh để xem điểm bắt đầu, điểm kết thúc vùng chọn hoặc độ dài và vị trí của đoạn âm thanh ở bất  cứ đâu trong cửa sổ chính.
- Các phím lệnh di chuyển con trỏ đến bảng điều khiển vùng chọn hay độ dài.
- Hiển thị phím tắt của Audacity và của Jaws cho Audacity.
- Dễ dàng tiếp cận với trang hướng dẫn sử dụng Audacity  với Jaws của David Bailes bằng phím lệnh Insert+W.
-	Đọc các vùng của cửa sổ chính, tức các thanh công cụ toolbars, bảng phân bố track (track panel) và thanh lựa chọn (selection bar) khi di chuyển con trỏ giữa chúng.
-	Đọc tên thanh công cụ khi con trỏ di chuyển từ thanh công cụ này sang thanh công cụ khác.
-	Khi con trỏ đang ở giữa các thanh công cụ, nhấn `CTRL+tab` để di chuyển đến phần điều khiển đầu 
tiên của thanh công cụ kế tiếp và `CTRL+shift+tab` để đến phần điều khiển cuối của thanh công cụ trước.
- Nhấn `Jawskey+delete` để xem trạng thái của chương trình: stop, play, play pause, record hay record pause.
-	Đọc vị trí con trỏ khi nhấn mũi tên trái hoặc phải trong lúc Audacity dừng và con trỏ đang ở trong bảng phân bố track (track panel).
- Các phím lệnh để mở rộng hoặc thu hẹp vùng chọn sẽ thông báo vị trí mới hoặc độ dài mới của vùng chọn đó.
- Trong nhiều hoạt động, thông báo khi không có project nào được mở (không có track nào trong bảng phân bố). 
- Track gain (chỉnh âm) và pan control (chỉnh độ cân bằng) được kích hoạt khi con trỏ PC hoạt động và đang ở trong cửa sổ chính. Trường hợp khác, Jaws sẽ kích hoạt tính năng di chuyển chuột.
-	Trong nhiều VST plug-in, có các phím lệnh để di chuyển con trỏ đến các thiết lập đã được cài đặt trước (preset) và kích hoạt chức năng lưu (save) hoặc tải (load) các cài đặt này. 
-	Trong nhiều hộp thoại plug-in, tên và giá trị của các điều khiển đã được Jaws đọc. 
- Hỗ trợ nhiều ngôn ngữ. Đã hỗ trợ tiếng Anh và tiếng Tây Ban Nha. Tập tin Readme đã được dịch ra tiếng Việt bởi Đặng Mạnh Cường, Nguyễn Hoàng Giang và Lê Thị Thêu. Xem tập tin audacity_readme_vi.txt trong thư mục cài đặt trong Program Files.
- Bạn có thể đi đến một track bằng cách nhập số. Bạn cũng có thể chuyển một track đến một vị trí xác định bằng số. Bạn cũng có thể đánh dấu một điểm "mark" trên track rồi sau đó trở lại điểm đã đánh dấu, hoặc chuyển một track đến đó. 
- Có phản hồi khi di chuyển bằng bàn phím (xem thêm bên dưới).
- Bản cài đặt hiện tại có thể sử dụng cho tất cả tài khoản (all user) hay tài khoản hiện tại (current user)và có thể cài vào thư mục Shared , bao gồm cài trên Jaws 17.
-Khi đang phát hay thu âm, phím `Enter` có chức năng tạm dừng hoặc tiếp tục. Trường hợp này, muốn bấm `Enter` thì hãy bấm `Ctrl+Enter`. Tôi thích tính năng này vì phím `Enter` ở bàn phím số dễ tìm hơn nút “p” khi bạn rời tay khỏi bàn phím. Tính năng này có thể bật / tắt thông qua tùy chọn trong Adjust Jaws options. Hãy thử và cho chúng tôi biết nếu nó hữu ích với bạn và nếu bạn thích nó. 

# cài đặt / tháo cài đặt script:

## Cài đặt:

1. chép bản cài đặt vào thư mục bất kỳ trong máy.
2. Chạy nó lên để cài đặt.

Bộ cài đặt hỗ trợ 3 tùy chọn:

- Just Scripts: Cài script nhưng không có phần gỡ cài đặt, hoặc thư mục trong %ProgramFiles% 
- Full: cài script trong thư mục script với phiên bản/ngôn ngữ được chọn, tạo thư mục trong `%programfiles%` (`%localappdata%` cho tài khoản hiện tại), có phần gỡ cài đặt và thêm các tập tin như readme chẳng hạn.
- Custom: giống với Full nhưng cho phép cài các tập tin nguồn của bộ cài đặt. 

Với chế độ full hay custom cho tất cả tài khoản, phần gỡ cài đặt và các tập tin readme được lưu trong thư mục cài đặt. 
Nếu chọn Just Scripts , tập tin What’s new và README sẽ được cài vào thư mục JAWS scripts cho từng phiên bản, và `What’s new.md` sẽ được đổi thành `audacity_whatsnew.md`. Tập tin readme bằng tiếng Việt sẽ không được cài đặt với lựa chọn này.

Nếu tài khoản quản trị cho phép cài đặt cho tất cả tài khoản, lựa chọn all user sẽ được thực hiện. Nếu không lựa chọn current user sẽ được thực hiện. Nếu tài khoản quản trị cho phép cài đặt cho tất cả các tài khoản, lựa chọn current user có thể được thực hiện bằng cách thêm lệnh chuyển `/curentuser`.   

Khi cài cho tất cả tài khoản, ở trang chọn phiên bản / ngôn ngữ, người dùng có thể chọn cài Script cho tài khoản hiện tại hoặc tất cả tài khoản.
Chương trình cài đặt cho phép người dùng chọn phiên bản và ngôn ngữ để cài. Nó sẽ biên dịch (compile) gói script cho từng phiên bản Jaws. Lưu ý script sẽ chỉ được biên dịch cho ngôn ngữ của phiên bản Jaws đang chạy. 

Nếu muốn hiệu chỉnh bộ cài đặt, hay chỉ đơn giản là muốn khám phá nó, bạn có thể cài installer source bằng cách chọn Custom install  > Install Installer source component.

 ##Gỡ cài đặt:
Gói cài đặt có thể được gỡ thông qua Program And Features (Add/Remove Programs). Bạn cũng có thể chạy tập tin `uninst.exe`   trong thư mục cài đặt (`%programfiles(x86)%\Jaws Script for Audacity` hoặc `%localappdata%\Jaws Script for Audacity`).

Nếu trình gỡ cài đặt nhận thấy các tập tin script đã được chỉnh sửa, nó sẽ yêu cầu xác nhận trước khi gỡ chúng. Nếu chọn yes thì các tập tin đã chỉnh sửa sẽ bị xóa, no thì ngược lại. các tập tin (`audacity.jcf` hoặc `audacity.jsi`) sẽ không bị xóa.

#Sử dụng script
Lưu ý: Script có đọc tên của vài phím nóng trong Audacity, và dùng vài phím lệnh khác để thực hiện một số hoạt động. Nếu bạn thay đổi các phím này trong Preferences > Keyboard, bạn phải thay đổi luôn trong tập tin `audacity.jkm` để script tiếp tục làm việc hiệu quả.

## Căn bản
Sau khi cài đặt, script sẽ đọc một thông điệp chào mừng ở lần đầu tiên khởi chạy Audacity. Bạn có thể xem danh sách các phím nóng được script cung cấp bằng cách bấm    `JAWSKey+h` (`HotKeyHelp`). Bạn cũng có thể xem các phím nóng của Audacity bằng cách bấm `JAWSKey+w`. Ở đây cũng có liên kết đến trang hướng dẫn sử dụng Audacity với Jaws bằng tiếng Anh, viết bởi David Bailes,  và được mở bằng trình duyệt của bạn.

Bạn có thể đọc trường bắt đầu và kết thúc / độ dài của vùng chọn bằng tổ hợp phím `Alt+[` và `Alt+]`. Bấm nhanh hai lần sẽ di chuyển con trỏ đến các trường này. Lưu ý rằng `Alt sẽ đọc là “end” hoặc “length” tùy theo lựa chọn của người dùng. Nếu con trỏ PC hoạt động, bấm `Alt+DEL` sẽ đọc giá trị của trường vị trí (Audio Position). (điều này có lợi khi đang nghe hoặc thu âm). Bấm nhanh hai lần để thực hiện tính năng gốc của lệnh này.
Bấm `JAWSKey+DEL` để biết trạng thái hiện tại của Audacity: stopped (dừng), play (phát), play pause (tạm dừng), record (thu âm), hoặc record pause (tạm dừng thu). (thông tin này cũng hiển thị trên thanh trạng thái của các phiên bản Audacity gần đây). 

    có thể xem thông tin về phiên bản của script  bằng cách bấm nhanh hai lần `JAWSKey+CONTROL+V` để hiển thị trên cửa sổ ảo. (Virtual Viewer). Thông tin này  cũng hiển thị trong phần JAWS hot key help.

URL để truy cập trang hướng dẫn sử dụng Audacity với Jaws có thể được chỉnh sửa bằng phím `Control+Shift+j`. Lệnh này mở ra một hộp thoại với một ô nhập liệu có sẵn URL hiện tại. Hãy chỉnh sửa nó rồi bấm OK để lưu lại.

Khi nhập một nhãn (label) vào label track, Jaws thường đọc các phím lệnh của Audacity, dù rằng nó là những kí tự đã được nhập vào tên của label. Chúng tôi đã khắc phục tình trạng trên nếu bạn đặt tên cho label bằng phương pháp chuẩn. Tính năng này được kích hoạt bằng `Ctrl+B` hay `Ctrl+M`. Và ngưng hoạt động khi bạn bấm `Enter` (hoặc bấm mũi tên di chuyển tới track khác hay con trỏ di chuyển khỏi bản phân bố track). Nó sẽ không hoạt động nếu bạn di chuyển tới track label và viết tên cho label. Nếu bạn thay đổi phím lệnh này trong Audacity, bạn cũng phải thay đổi luôn trong tập tin `Audacity.jkm`.

Khi con trỏ ở trong track lable, bấm `Tab` để Jaws đọc tên label hiện tại. Tính năng này không phải lúc nào cũng hoạt động. Nhất là khi có quá nhiều label.


## Các tùy chọn cho Script

Script có một vài tùy chọn để điều khiển một số tính năng, có thể được truy cập bằng cách nhấn `JAWSKey + v`. Đối với các phiên bản trước JAWS 13, thiết lập này được lưu trữ trong tập tin `Audacity. JSI` trong thư mục PersonalSettings của JAWS. Đối với các phiên bản sau 13, chúng được lưu trữ trong tập tin `audacity.jcf` trong phần `NonJCFOptions`. Nếu bạn nâng cấp từ một phiên bản JAWS trước 13 lên jaws 13 hay cao hơn, các thiết lập này không được Jaws chuyển từ `audacity.jsi`, vì vậy, bạn sẽ phải thiết lập lại. 

## Đi đến và di chuyển track
Có thể đi đến một track bằng số của nó, di chuyển một track đến một vị trí khác cũng bằng số và nhớ vị trí  của một track để trở lại sử dụng sau, hay di chuyển một track khác đến vị trí đó. Jaws cũng sẽ thông báo nếu bạn di chuyển track bằng bàn phím. Tính năng này chỉ hoạt động với Audacity 2.1.1 trở lên, và yêu cầu phải cấu hình vài thứ trong Audacity. Bạn phải gán phím nóng `Control+Shift+ Mũi Tên lên` cho lệnh `move focus track up`, `Control+Shift+ Mũi Tên Xuống` cho lệnh move track down. Để làm điều đó:
1. Tại cửa sổ Audatcity, mởPreferences (`Control+P`) và bấm `K` để đi đến nhánh keyboard.
2. Bấm Tab đến o nhập liệu và gõ "move focused" (tôi dùng Tree view).
3. BấmTab đến Tree view và tìm `Move focused track down`.
4. bấm tab đến Shortcut và bấm `Control+Shift+Mũi Tên Xuống`.
5. Bấm Tab đến nút `Set` rồi bấm khoảng trắng để kích hoạt
6. Bấm `Shift+Tab` hai lần để trở về Tree view.
7. Tìm lệnh `Move focused track up` và gán phím nóng `Ctrl+Shift+Mũi Tên Lên` như các bước trên.
8. Bấm Tab đến OK và bấm khoảng trắng.

Nếu muốn dùng các phím khác, bạn phải gán lại trong tập tin `Audacity.jkm`.

Sau khi thiết lập như trên, bạn có thể đi đến một track bằng phím `JawsKey+A, G`. Script sẽ yêu cầu nhập số. Có thể nhập số của track để đi đến nó. Thêm vào dấu cộng (`+`) để di chuyển xuống phía dưới (track có số lơn hơn), hay thêm dấu trừ (`-`)để di chuyển lên trên. Bạn có thể di chuyển một track bằng lệnh `Jawskey+a, M`. Bạn có thể đánh dấu track hiện tại bằng  lệnh `Jawskey+A, K` và di chuyển tới nó bằng lệnh Jawskey+A, Shift+G và di chuyển track hiện tại đến vị trí đã đánh dấu bằng lệnh `Jawskey+A, Shift+M`.
Lưu ý rằng việc đánh dấu chỉ đơn giản là nhớ số track. Vậy nên, nếu bạn thêm / xóa track ở trên nó, con trỏ sẽ di chuyển không đúng vị trí đã đánh dấu. Bấm `Jawskey+5 bên bàn phím số` cho biết số của track hiện tại và tổng số track hiện có khi con trỏ ở trong bản phân bố track. (Một số người dùng có thể nghĩ rằng "Audacity đã cho biết số track", nhưng tính năng đó sẽ không hoạt động khi bạn đổi tên track hay nhập một tập tin vào project.

# Một số trở ngại: 

1. Phiên bản này của script có khả năng bị im lặng trước các hiệu ứng như Amplify. Đôi khi không thể khắc phục được. Nếu điều này xảy ra, ta chuyển con trỏ của Audacity sang cửa sổ khác rồi trở lại thì sẽ khắc phục được.

2. Các vùng vị trí đôi khi không được rút ngắn. Điều này xảy ra vì hàm `GetWindowsText` của Jaws chỉ trả về số mà không có chữ H, M,:, VV. Chúng tôi không biết nguyên nhân gây ra lỗi này. Tôi đã khắc phục nó bằng cách tắt và khởi động lại Audacity. điều này đã được quan sát với JAWS 10, 15, 16 và 17. 

3. Một hiệu ứng phụ của phím `ENTER` tạm dừng trong suốt quá trình ghi âm và phát là bạn không thể sử dụng `ENTER` để chọn / bỏ chọn các track trong khi đang phát hoặc đang ghi âm. Trường hợp này, ta Sử dụng `Control+Enter` khi muốn bấm `Enter`. 

4.  Nếu bạn thiết lập cho phím  `numpad ENTER` và thiết lập JAWS để xử lý các phím mở rộng một cách riêng biệt, kể cả phím `Enter` cũng sẽ được đặt cho việc gõ phím `Enter`. Nếu bạn không thích tính năng này bạn có thể tắt nó bằng cách thêm một dấu chấm phẩy trên các dòng `ENTER`, `NumPadEnter` và `Control + ENTER` trong `audacity.jkm` và loại bỏ các dấu chấm phẩy trên dòng có chứa `/ *` và `* /` trước và sau scripts `Enter` và `CtrlEnter` trong `audacity.jss`. Nếu có thay đổi trong tập tin `Audacity.JSS`, vui lòng thay đổi giá trị ngày trong biến Version để chúng tôi biết đây làphiên bản chỉnh sửa nếu bạn có liên hệ với chúng tôi.

5. Trình biên dịch Jaws Script chỉ hoạt động với ngôn ngữ mà Jaws đang chạy. Xem thêm bên dưới.
6. Các phiên bản trước 13.0, phím nóng để thiết lập cho script (`JAWSKey+v`) sẽ không hiển thị trong phần Hotkey Help. Tuy nhiên, nó vẫn hoạt động. Chúng tôi có thể khặc phục điều này nếu nó là một vấn đề nghiêm trọng với người dùng.
Các script đã được phát triển với Audacity 2.0.3, 2.0.4, 2.0.5, 2.1.0 và JAWS 10.0.1178u trên Windows XP SP3, và JAWS 13-16 trên máy laptop chạy Windows 7 và 8.1. Nó có lẽ sẽ làm việc với bất cứ phiên bản JAWS nào sau 5.0, mặc dù các tùy chọn  cho Audacity trong việc Điều chỉnh JAWS Verbosity có vẻ không tốt lắm. 


# Hỗ trợ đa  ngôn ngữ
Bộ cài đặt hỗ trợ cài đặt Script cho nhiều ngôn ngữ. Bộ cài đặt này vẫn xử lí phần ngôn ngữ giống các bộ cài đặt trước. Vậy nên trang chọn phiên bản sẽ hiển thị theo kiểu 16.0/enu. Hiện nay, tiếng Anh và tiếng Tây Ban Nha đang được hỗ trợ.Fernando Gregoire đã đóng góp bản dịch tiếng Tây Ban Nha.

Dù rằng bộ cài đặt thực hiện việc cài và biên dịch Script cho ngôn ngữ đã được chọn, nhưng Jaws Script Compiler thì luôn luôn biên dịch script cho ngôn ngữ mà jaws đang chạy. Vậy nên, sau khi cài Script, bạn phải chạy Jaws với ngôn ngữ đã chọn của script và biên dịch lại.

#lưu ý cho những người viết script
Nếu có chỉnh sửa các tập tin của script, vui lòng cập nhật biến của phiên bản (Version Constain) ở dòng gần đầu tập tin `Audacity.jss`. Điều này rất quan trọng nếu bạn công bố script, dù bạn chỉ chỉnh sửa cho cá nhân bạn. Nó sẽ giúp chúng tôi biết rằng đây là phiên bản có chỉnh sửa nếu bạn liên lạc với chúng tôi về script này. 

Các thông điệp và chuỗi hằng được lưu trong `Audacity.JSM` và `Audacity.QSM`.
Các thông điệp của bộ cài đặt đã được bản địa hóa. Chúng đã được tách ra khỏi bộ cài nên người dùng có thể viết lại thông điệp cho từng ngôn ngữ. Hiện tại, tiếng Anh và tiếng Tây Ban Nha đã được hỗ trợ. Các thông điệp này được lưu trong các tập tin `.nsh` với các tên kiểu như  `*_enu.nsh` hay `*_lang_enu.nsh` .
Bộ cài đặt đã được tải lên GitHub tại địa chỉ <https://github.com/campg2j003/JAWS-Script-for-Audacity>.  
nếu bạn muốn đóng góp cho script, vui lòng xem tập tin [CONTRIBUTING.md] https://github.com/campg2j003/JAWS-Script-for-Audacity/blob/master/CONTRIBUTING.md

# Lưu ý cho người biên dịch
Lưu ý rằng tập tin `Readme.HTML` đã được tạo từ tập tin `Readme.MD`, chỉ dùng được trên kho chia sẻ của GidHub. Vui lòng xem tập tin [CONTRIBUTING.md] để có thêm thông tin.

Lưu ý rằng script được biên dịch với lệnh agma usePoFile 0 .


# kết luận
Script được phát triển với Audacity 2.0.3, 2.0.4, 2.0.5, 2.1.0, 2.1.1 và 2.1.2. Nó sẽ hoạt động được với Các phiên bản Jaws từ 5.0 trở lên, dù rằng các tùy chọn cho Audacity trong phần Adjust Jaws Verbosity có vẻ chưa tốt lắm và cũng chưa được kiểm tra (tôi nhớ rằng chúng tôi đã dùng một hàm mà theo FSDN thì chỉ dùng được cho Jaws 10.0 trở lên). Các phiên bản gần đây đã được phát triển với Jaws 17.0 và Windows 10. Dù rằng vẫn hỗ trợ cho các phiên bản cũ của Jaws, chúng tôi vẫn chưa thử nghiệm script trên các phiên bản đó. Hiện nay, chưa có hỗ trợ nào cho màn hình chữ nổi.

tôi sẵn sàng tiếp nhận những phản hồi cho script, cũng như các đề nghị để cải thiện, nhưng không thể hứa hẹn về  việc cập nhật nó.

dưới đây là bảng phím nóng hỗ trợ của jaws:


```


Để đọc vùng chọn trái, nhấn Alt+[.
Để đọc vùng chọn phải hoặc độ dài, nhấn Alt+].
nếu muốn di chuyển con trỏ đến đó, nhấn  tổ hợp phím trên nhanh hai lần.
để đọc ô Audio Position value, nhấn Alt+Delete.
 khi đã kích hoạt con trỏ PC, để đọc thông tin về con trỏ đang hoạt động, nhấn Alt+Delete nhanh 2 lần.

để tăng gain của focus track, nhấn Alt+Shift+mũi tên lên.
Để giảm gain của focus track, nhấn Alt+Shift+mũi tên xuống.
để điều chỉnh âm thanh qua loa trái, nhấn Alt+Shift+mũi tên trái.
để điều chỉnh âm thanh qua loa phải, Alt+Shift+mũi tên phải.
4 phím nóng ở trên đã thay thế 4 phím nóng dùng để di chuyển chuột của Jaws khi con trỏ ở cửa sổ chính của ứng dụng. Vì vậy, để sử dụng tính năng này, trước tiên, phải bật con trỏ Jaws.

Để đi đến một track bằng số,  nhấn JAWSKey+a, g.
Để di chuyển track tại vị trí con trỏ đến một vị trí mong muốn, nhấn JAWSKey+a, m.
Để đánh dấu track tại vị trí con trỏ, nhấn JAWSKey+a, k.
Để đi đến track đã đánh dấu, nhấn JAWSKey+a, Shift+g.
Để đi đến track được đánh dấu và đánh dấu điểm bắt đầu của track, nhấn JAWSKey+a, x.
Để di chuyển con trỏ hiện tại đến vị trí của track đã được đánh dấu và để đánh dấu một điểm tại vị trí con trỏ, nhấn Insert+a, Shift+m.

để bật / tắt chế độ đọc (speech) của Jaws, nhấn Shift+Insert+S
để bật tắt các thông báo của Jaws với Audacity, nhấn Ctrl+` 
lệnh này giống với tùy chọn Announce Audacity messages trong Adjust Jaws Option.s
xem tap tin Whats new.txt để biết thêm thông tin

ở một thanh công cụ muốn chuyển đến thanh công cụ tiếp theo, nhấn Control+Tab
ở một thanh công cụ muốn chuyển đến thanh công cụ  trước đó, nhấn Control+Shift+Tab

để jaws đọc trạng thái của chương trình (đang phát/tạm dừng/thu âm/tắt) nhấn JAWSKey+delete
để trả các thiết lập của script về mặc định, nhấn Shift+Control+`
để di chuyển giữa hai danh sách trong hộp thoại Edit Chains, nhấn F6.

Để xem các phím nóng của Audacity, nhấn Insert+w.
Để đọc các phím nóng mật định của Windows, nhấn Insert+w nhanh hai lần.

nếu bật tùy chọn "ENTER pauses during play/record", nhấn Enter sẽ kích hoạt lệnh tạm dừng (Pause) khi phát âm thanh hoặc thu âm
nhấn Ctrl+Enter để kích hoạt lệnh Enter trong trường hợp này.

Trong vài VST plugins thông thường, như là L1V:
Đưa con trỏ về ô Preset, nhấn Alt+P.
Để tải một preset có sẵn, nhấn  Alt+L.
Để lưu những thiết lập hiện tại thành preset, nhấn  Alt+S.

Nếu SilencePreview được bật và bạn bấm nút Preview trong một hiệu ứng, thỉnh thoảng, tính năng Silence không thể tắt được. Kết quả là các thông điệp xuất hiện khi thay đổi cửa sổ sẽ bị bỏ qua. Bạn có thể khắc phục bằng cách chuyển sang một cửa sổ khác rồi chuyển về Audacity.

Để thay đổi thiết lập cho script Audacity, nhấn JAWSKey+V.

			Để thay đổi URL cho hướng dẫn sử dụng Audacity với Jaws, nhấn Shift+Control+J

```

Hãy trải nghiệm!
