package br.com.respetcure;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class RespetcureApplication {

	public static void main(
			String[] args
	) {

		SpringApplication.run(
				RespetcureApplication.class,
				args
		);
	}
}