importPackage( Packages.com.openedit.util );
importPackage( Packages.java.util );
importPackage( Packages.java.lang );
importPackage( Packages.com.openedit.modules.update );

var appname = "emshare";

var zip = "http://dev.entermediasoftware.com/jenkins/job/" + appname + "/lastSuccessfulBuild/artifact/deploy/" + appname + ".zip";

var root = moduleManager.getBean("root").getAbsolutePath();
var tmp = root + "/WEB-INF/tmp";

log.add("1. GET THE LATEST ZIP FILE");
var downloader = new Downloader();
downloader.download( zip, tmp + "/" + appname + ".zip");

log.add("2. UNZIP WAR FILE");
var unziper = new ZipUtil();
unziper.unzip(  tmp + "/" + appname + ".zip",  tmp );

var files = new FileUtils();
log.add("3. UPGRADE BASE DIR");
files.deleteAll( root + "/WEB-INF/base" + appname);
files.copyFiles( tmp + "/" + appname, root + "/WEB-INF/base" + appname + "/");

log.add("4. CLEAN UP");
files.deleteAll(tmp);

log.add("5. UPGRADE COMPLETED");
