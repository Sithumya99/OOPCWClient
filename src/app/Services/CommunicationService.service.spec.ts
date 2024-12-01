import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpHeaders } from '@angular/common/http';
import { CommunicationService } from './CommunicationService.service';
import { UserProfileFacade } from '../Facades/UserProfile/UserProfileFacade.facade';
import { environment } from '../../environments/environment';

describe('CommunicationService', () => {
  let service: CommunicationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CommunicationService],
    });

    service = TestBed.inject(CommunicationService);
    httpMock = TestBed.inject(HttpTestingController);

    spyOn(UserProfileFacade, 'getAuth').and.returnValue('sample-token');
    spyOn(UserProfileFacade, 'setAuth');
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  it('should make a POST request with correct headers', () => {
    const cmd = 'someCommand';
    const body = { key: 'value' };
    const url = `${environment.url}/${cmd}`;
    const mockResponse = { success: true };

    service.postFromTicketServer(cmd, body).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Authorization')).toBe('Bearer sample-token');
    expect(req.request.headers.get('Content-Type')).toBe('application/json; charset=UTF-8');
    req.flush(mockResponse);
  });

  it('should make a GET request with correct headers', () => {
    const cmd = 'getCommand';
    const url = `${environment.url}/${cmd}`;
    const mockResponse = { data: 'someData' };

    service.getFromTicketServer(cmd).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe('Bearer sample-token');
    req.flush(mockResponse);
  });

  it('should extract data and set authorization header if provided', () => {
    const cmd = 'testCommand';
    const body = { key: 'value' };
    const url = `${environment.url}/${cmd}`;
    const mockAuthToken = 'Bearer new-token';
    const mockResponse = { body: { data: 'responseData' } };

    service.postFromTicketServer(cmd, body).subscribe((response) => {
      expect(response).toEqual(mockResponse.body);
      expect(UserProfileFacade.setAuth).toHaveBeenCalledWith(mockAuthToken);
    });

    const req = httpMock.expectOne(url);
    req.flush(mockResponse.body, { headers: new HttpHeaders({ Authorization: mockAuthToken }) });
  });

  it('should create HTTP options with Authorization header if token exists', () => {
    const options = service.createHttpOptions();
    expect(options.headers.get('Authorization')).toBe('Bearer sample-token');
    expect(options.headers.get('Content-Type')).toBe('application/json; charset=UTF-8');
  });

  it('should create HTTP options without Authorization header if no token exists', () => {
    (UserProfileFacade.getAuth as jasmine.Spy).and.returnValue(undefined);
    const options = service.createHttpOptions();
    expect(options.headers.get('Authorization')).toBeNull();
    expect(options.headers.get('Content-Type')).toBe('application/json; charset=UTF-8');
  });
});