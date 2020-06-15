import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'age'})
export class AgePipe implements PipeTransform {

	transform(birthdate: string): string {
		let today = new Date();
		let birth = new Date(birthdate)
		let age = today.getFullYear() - birth.getFullYear();
		let m = today.getMonth() - birth.getMonth();

		if(m < 0 || (m === 0 && today.getDate() < birth.getDate())){
			age--;
		}
		
		let age_string = age.toString();
		return age_string;
	}

}