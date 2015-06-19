package org.collectionspace;

import java.io.DataInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class CollectionSpaceServlet extends HttpServlet {
	private static final String STATIC_ASSET_DIR_PATH = "../../cspace/ui";
	private static final String JS_BUNDLE_FILE_NAME = "bundle.js";
	private static final int BUFFER_SIZE = 4096;
	private static final int CACHE_TIME_SECS = 604800; // 1 week
	
	private Path servletPath;
	
	@Override
	public void init() throws ServletException {
		servletPath = Paths.get(getServletContext().getRealPath("/"));
	}

	@Override
	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		
		String pathInfo = request.getPathInfo();
		String[] pathElements = pathInfo.split("/", 3);
		
		String tenant = (pathElements.length > 1) ? pathElements[1] : "";
		String assetPath = (pathElements.length > 2) ? pathElements[2] : "";
		
		// The request must be tenant-qualified.
		
		if (tenant == "") {
			response.sendError(404);
			return;
		}
		
		// If a static asset exists for the tenant at the requested path, return it.
		// Otherwise, return the UI entry file, which will route the path on the client side.

		Path tenantAssetPath = servletPath.resolve(STATIC_ASSET_DIR_PATH).resolve(tenant);
		Path staticAssetPath = tenantAssetPath.resolve(assetPath);
		File staticFile = new File(staticAssetPath.toString());
	
		if (staticFile.canRead() && staticFile.isFile()) {
			transmitFile(staticFile, response);
		}
		else {
			String bundleUrl = request.getContextPath() + "/" + tenant + "/" + JS_BUNDLE_FILE_NAME;
			
			transmitEntryFile(bundleUrl, response);
		}
	}

	protected void transmitFile(File file, HttpServletResponse response)
			throws IOException {
		
		if (file.canRead() && file.isFile()) {
			// TODO: Use the cache filter in Tomcat 7.
			response.setHeader("Cache-Control", "max-age=" + CACHE_TIME_SECS);
			
			String mimeType = getServletContext().getMimeType(file.getPath());
			
			response.setContentType(mimeType);
			response.setContentLength((int) file.length());
			
			ServletOutputStream out = response.getOutputStream();
			DataInputStream in = new DataInputStream(new FileInputStream(file));
	
			byte[] buffer = new byte[BUFFER_SIZE];
			int length = 0;
	
			while ((length = in.read(buffer)) != -1) {
				out.write(buffer, 0, length);
			}
	
			in.close();
			out.close();
		}
		else {
			response.sendError(404);
		}
	}
	
	protected void transmitEntryFile(String bundleUrl, HttpServletResponse response)
			throws IOException {

		ServletOutputStream out = response.getOutputStream();
		
		out.println("<html>");
		out.println("  <head>");
		out.println("    <meta charset='UTF-8'>");
		out.println("    <title>CollectionSpace</title>");
		out.println("  </head>");
		out.println("  <body>");
		out.println("    <script src='" + bundleUrl + "'></script>");
		out.println("  </body>");
		out.println("</html>");
		
		out.close();
	}
}
