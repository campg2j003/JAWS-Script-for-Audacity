<?xml version="1.0" encoding="utf-8" ?>
<QuickSettings>
	<QuickSettingsDefinitions 
		xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" >
		<Category ID="Audacity Options">
			<Setting
 ID="Audacity Options.Announce Audacity messages" Type="Boolean">
				<SettingsFile Section="NonJCFOptions" Name="AnnounceMessage" />
			</Setting>
			<Setting ID="Audacity Options.Announce toolbars" Type="Boolean">
				<SettingsFile Section="NonJCFOptions" Name="AnnounceToolbars" />
			</Setting>
			<Setting ID="Audacity Options.ENTER pauses during play/record" Type="Boolean">
				<SettingsFile Section="NonJCFOptions" Name="EnterPause" />
			</Setting>
			<Setting
 ID="Audacity Options.Silence Preview" Type="Boolean">
				<SettingsFile Section="NonJCFOptions" Name="SilencePreview" />
			</Setting>
			<Setting
 ID="Audacity Options.Silence Record" Type="Boolean">
				<SettingsFile Section="NonJCFOptions" Name="SilenceRecord" />
			</Setting>
			<Setting
				ID="Audacity Options.SayPosition" Type="List">
				<Values>
					<Value ID="Audacity Options.SayPosition.0" /> <!-- none -->
					<Value ID="Audacity Options.SayPosition.1" /> <!-- all but motion -->
					<Value ID="Audacity Options.SayPosition.2" /> <!-- all -->
				</Values>
				<SettingsFile Section="NonJCFOptions" Name="SayPosition" />
			</Setting>
			<Setting
 ID="Audacity Options.PreviewMotion" Type="Boolean">
				<SettingsFile Section="NonJCFOptions" Name="PreviewMotion" />
			</Setting>
		</Category>
	</QuickSettingsDefinitions>
</QuickSettings>
